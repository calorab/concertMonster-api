// const expect = require('chai').expect;
// // const faker = require('faker');
// const mongoose = require('mongoose');

// const User = require('../Models/user');
// // const authController = require('../Controllers/auth');
// const {app, runServer, closeServer} = require('../server');
// const {TEST_DATABASE_URL} = require('../config');

// describe('Auth Controller', () => {
  
//   before(done => {
//     mongoose
//       .connect(
//         'mongodb+srv://admin:HM7wwhyy3GcjhzS@cluster0-6akq9.mongodb.net/test?retryWrites=true&w=majority'
//       ) 
//       .then(result => {
//         console.log('running server ');
//         const user = new User({
//           email: 'test1@test.com',
//           password: '12345',
//           artists: [],
//           _id: '5e1ca9740bbc12a24226907'
//         });
//         return user.save();
//       })
//       .then(() => {
//         done();
//       }); 
//   });

//   describe('Auth - Login', () => {
//     it('should login the user', done => {});

//     it('should throw error if email not found', done => {});

//   });

//   describe('Auth - signup', () => {
  
//     it('should throw an error ', done => {
      
//     }); 
  
//     it('should create a new user', done => {

//     });
  
//   });


//   after(done => {
//     User.deleteMany({})
//       .then(() => {
//         return mongoose.disconnect();
//       })
//       .then(() => {
//         done();
//       });
//   });
// });
