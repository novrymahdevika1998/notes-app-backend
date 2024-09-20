const Hapi = require('@hapi/hapi');
const { nanoid } = require('nanoid');
const notes = require('./notes')

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            }
        }
    })

    server.route([
        {
            method: 'POST',
            path: '/notes',
            handler: (req, h) => {
                const { title, tags, body } = req.payload
                const id = nanoid(16)
                const createdAt = new Date().toISOString();
                const updatedAt = createdAt;

                const newNote = { title, tags, body, id, createdAt, updatedAt}

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
        },
        {
            method: 'GET',
            path: '/notes',
            handler: (req, h) => {
                return {
                    status: 'success',
                    data: {
                        notes,
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/notes/{id}',
            handler: (req, h) => {
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
        },
        {
            method: 'PUT',
            path: '/notes/{id}',
            handler: (req, h) => {
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
        },
        {
            method: 'DELETE',
            path: '/notes/{id}',
            handler: (req, h) => {
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
        }
    ])

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`)
}

init();