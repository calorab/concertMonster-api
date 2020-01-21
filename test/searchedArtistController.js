// const should = require('chai').should();
// const mongoose = require('mongoose');

// const User = require('../models/user');
// const followedArtistsController = require('../Controllers/followedArtistsController');
// const {app, runServer, closeServer} = require('../server');
// const {TEST_DATABASE_URL} = require('../config');

// describe('Searched Artists Controller', () => {
//     before(done => {
//         mongoose
//         .connect(
//             'mongodb+srv://admin:HM7wwhyy3GcjhzS@cluster0-6akq9.mongodb.net/test?retryWrites=true&w=majority'
//         )
//         .then(result => {
//             const user = new User({
//             email: 'test@test.com',
//             password: '12345',
//             artists: [],
//             _id: '5e1ca9740bbc132a24226907'
//             });
//             return user.save();
//         })
//         .then(() => {
//             done();
//         });
//   });

//     it('should return list of search results', done => {
//         const req = {
//             params: {
//                 artistName: 'alison'
//             }
//         };

//     });

//     it('should get all artists followed by creator', done => {
//         req = { userId: '5e1ca9740bbc132a24226907'};

//     });

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