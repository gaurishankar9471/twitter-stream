let chai = require('chai');
let chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
let server = require('./index');

//Our parent block
describe('Podcast', () => {
    //fdsjhsdfbjkdbsfk
   describe('/GET message', () => {
        it('it should GET a message', (done) => {
        chai.request(server)
            .get('/message')
            .end((err, res) => {
                  (res).should.have.status(200);
                  (res.body).should.be.a('object');
                  done();
               });
            });
        });
   });
