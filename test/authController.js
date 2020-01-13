const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../Models/user');
const AuthController = require('../Controllers/auth');

describe('Auth Controller', function() {
  before(function(done) {
    mongoose
      .connect(
        'mongodb+srv://admin:HM7wwhyy3GcjhzS@cluster0-6akq9.mongodb.net/test-testing?retryWrites=true&w=majority'
      ) 
      .then(result => {
        const user = new User({
          email: 'test1@test.com',
          password: '12345',
          artists: []
          _id: '5e1ca9740bbc132a24226906'
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });

  beforeEach(function() {});

  afterEach(function() {});

  it('should throw an error with code 500 if accessing the database fails', function(done) {
    sinon.stub(User, 'findOne');
    User.findOne.throws();

    const req = {
      body: {
        email: 'test@test.com',
        password: '12345'
      }
    };

    AuthController.login(req, {}, () => {}).then(result => {
      expect(result).to.be.an('error');
      expect(result).to.have.property('statusCode', 500);
      done();
    });

    User.findOne.restore();
  });

//   it('should send a response with a valid user status for an existing user', function(done) {
//     const req = { userId: '5c0f66b979af55081b34728a' };
//     const res = {
//       statusCode: 500,
//       userStatus: null,
//       status: function(code) {
//         this.statusCode = code;
//         return this;
//       },
//       json: function(data) {
//         this.userStatus = data.status;
//       }
//     };
//     AuthController.getUserStatus(req, res, () => {}).then(() => {
//       expect(res.statusCode).to.be.equal(200);
//       expect(res.userStatus).to.be.equal('I am new!');
//       done();
//     });
//   });

  after(function(done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
