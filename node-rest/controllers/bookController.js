var bookController = function(Book){

    var post = function (req, resp) {
        console.log(book);
        var book = new Book(req.body);
        console.log(book);
        book.save();
        resp.status(201).send(book);
    };

    var get = function (req, resp) {
        var query = req.query;
        console.log(query);
        Book.find(query, function (err, books) {
            if (err) {
                resp.status(500);
            } else {
                resp.json(books);
            }
        });

    };

    return {
        post : post,
        get : get
    }

};

module.exports = bookController;