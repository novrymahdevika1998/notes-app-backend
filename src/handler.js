const { nanoid } = require('nanoid');
const notes = require('./notes')
const books = require('./books')

const addNoteHandler = (req, h) => {
    const { title, tags, body } = req.payload
    const id = nanoid(16)
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = { title, tags, body, id, createdAt, updatedAt }

    notes.push(newNote)


    const isSuccess = notes.filter(note => note.id === id).length > 0

    if (isSuccess) {
        const response = h.response({
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            }
        })

        response.code(201);
        return response;
    }

    const response = h.response({
        message: 'Catatan gagal ditambahkan'
    })
    response.code(500)
    return response;
}

const getNotesHandler = (req, h) => {
    return {
        status: 'success',
        data: {
            notes,
        }
    }
}

const getNoteHandler = (req, h) => {
    const { id } = req.params;
    const note = notes.filter(n => n.id === id)[0];

    if (typeof note === 'undefined') {
        const response = h.response({
            status: 'fail',
            message: 'Catatan tidak ditemukan'
        })
        response.code(404)
        return response;
    }

    return {
        status: 'success',
        data: {
            note,
        }
    }
}

const updateNoteHandler = (req, h) => {
    const { id } = req.params;
    const { title, tags, body } = req.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex(note => note.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        }

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        })
        response.code(200)
        return response;
    }
}

const deleteNoteHandler = (req, h) => {
    const { id } = req.params;

    const index = notes.findIndex(note => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1);

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus'
        })
        response.code(200)
        return response;
    }
}

const addBookHandler = (req, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload

    const id = nanoid(16)
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage

    const newBook = { name, year, author, summary, publisher, pageCount, readPage, reading, id, insertedAt, updatedAt, finished }

    books.push(newBook)

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        })
        response.code(400)
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(400)
        return response;
    }

    const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: id,
        }
    })

    response.code(201)
    return response;
}

const getBooksHandler = (req, h) => {
    const response =  h.response({
        status: 'success',
        data: {
            books,
        }
    })

    response.code(200)
    return response;
}

const getBookHandler = (req, h) => {
    const { id } = req.params;

    const book = books.filter(b => b.id === id)[0];

    if (!book) {
        const response = h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan'
        })
        response.code(404)
        return response;
    }

    const response = h.response({
        status: 'success',
        data: {
            book,
        }
    })

    response.code(200)
    return response;
}

const updateBookHandler = (req, h) => {
    const { id } = req.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload;

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        })
        response.code(400)
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(400)
        return response;
    }

    const updatedAt = new Date().toISOString();

    const index = books.findIndex(book => book.id === id);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt,
        }

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui'
        })

        response.code(200)
        return response;
    } else {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan'
        })

        response.code(404)
        return response;
    }
}

const deleteBookHandler = (req, h) => {
    const { id } = req.params;

    const index = books.findIndex(book => book.id === id);

    if (index !== -1) {
        books.splice(index, 1);

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus'
        })

        response.code(200)
        return response;
    } else {
        const response = h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan'
        })

        response.code(404)
        return response;
    }
}

module.exports = {
    addNoteHandler,
    getNotesHandler,
    getNoteHandler,
    updateNoteHandler,
    deleteNoteHandler,
    addBookHandler,
    getBooksHandler,
    getBookHandler,
    updateBookHandler,
    deleteBookHandler,
};