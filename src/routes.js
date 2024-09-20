const { addNoteHandler, getNotesHandler, getNoteHandler, updateNoteHandler, deleteNoteHandler, addBookHandler, getBooksHandler, getBookHandler, updateBookHandler, deleteBookHandler } = require('./handler')

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getNotesHandler
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteHandler
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: updateNoteHandler
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteHandler
    },
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler
    },
    {
        method: 'GET',
        path: '/books',
        handler: getBooksHandler
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookHandler
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: updateBookHandler
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookHandler
    }
]

module.exports = routes;