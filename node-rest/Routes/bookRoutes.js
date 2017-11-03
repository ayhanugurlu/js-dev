var express = require('express');


var routes = function (Book) {

    var bookRouter = express.Router();

    bookRouter.route('/')
        .post(function (req, resp) {
            console.log(book);
            var book = new Book(req.body);
            console.log(book);
            book.save();
            resp.status(201).send(book);
        })
        .get(function (req, resp) {
            var query = req.query;
            console.log(query);
            Book.find(query, function (err, books) {
                if (err) {
                    resp.status(500);
                } else {
                    resp.json(books);
                }
            });

        });


    bookRouter.use('/:bookId', function (req, resp, next) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                resp.status(500);
            } else if (book) {
                req.book = book;
                next();
            } else {

                resp.json(book);
            }
        });
    });
    bookRouter.route('/:bookId')
        .get(function (req, resp) {
            resp.json(req.book);
        })
        .put(function (req, resp) {
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book.save(function (err) {
                if (err) {
                    resp.status(500);
                } else {
                    resp.json(req.book);
                }
            });

        })
        .patch(function (req, resp) {
            console.log("Patch...");
            if (req.body._id) {
                delete req.body._id;
            }

            for (p in req.body) {
                req.book[p] = req.body[p];
            }
            req.book.save(function (err) {
                if (err) {
                    resp.status(500);
                } else {
                    resp.json(req.book);
                }
            });


        })
        .delete(function (req, resp) {
            console.log("Delete...");

            req.book.remove(function (err) {
                if (err) {
                    resp.status(500);
                } else {
                    resp.status(204).send("Removed");
                }
            });


        });
    return bookRouter;
};

module.exports = routes
