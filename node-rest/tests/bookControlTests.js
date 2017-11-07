var sholud = require('should'),
    sinon = require('sinon');


describe('Book Controller Tests:',function(){
    describe('Post:',function(){
        it('should not allow empty title on post',function(){
            var Book = function(book){
                this.save = function () {
                    
                }
            };
            var req = {
                body : {
                    author: 'Jon'
                }
            };

            var resp = {
                status: sinon.spy(),
                send: sinon.spy()
            }


            var bookController = require('../controllers/bookController.js')(Book);
            bookController.post(req,resp)

            resp.status.calledWith(400).should.equal(true,'Bad status',resp.status.args[0]);
            resp.send.calledWith('Title is required').should.equal(true);
        });
    });
})