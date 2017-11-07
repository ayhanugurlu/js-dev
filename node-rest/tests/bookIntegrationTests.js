var sholud = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Book = mongoose.model('Books'),
    agent = request.agent(app);

describe('Book CRUD Tests:',function(){
    it('Shoud allow a book to be posted and return a read bıık _id',function(done){
        var bookTest= {title:'new book',author:'ayhan',genre:'Fiction'};
        agent.post('/api/books').
            send(bookTest).
            expect(200).
        end(function (err,result) {
            result.body.read.equal(false);
            result.body.should.have.property('_id');
            done();
        });

    })

    afterEach(function (done){
        Book.remove().exec();
        done();
    } );
});
