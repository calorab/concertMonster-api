const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const mongoose = require('mongoose');

const User = require('../Models/user');
const Artist = require('../Models/artist');
const app = require('../app');

chai.use(chaiHttp);
// HELP - error notes:
// ***Getting error: TypeError: Cannot read property 'address' of undefined - referring to request(app)
describe('Followed Artists Controller', () => {
    before(done => {
        mongoose
        .connect(
            'mongodb+srv://admin:HM7wwhyy3GcjhzS@cluster0-6akq9.mongodb.net/test?retryWrites=true&w=majority'
        )
        .then(result => {
            const user = new User({
                email: 'test@test.com',
                password: '123456'
            });
            console.log('User Created!!!' + user);
            return user.save();
        })
        .then(user => {
          const artist = new Artist({
            name: "Halsey",
            tour: "2020-06-04",
            url: "http://www.songkick.com/artists/203876-alison-krauss?utm_source=54847&utm_medium=partner",
            creator: user._id 
          });
          console.log('Artist Created!!!' + artist)
          return artist.save();
        })
        .then(() => {
            done();
        }).catch(done);
  });


  describe('FollowedArtists - GET', () => {
    it('should get all artists followed by creator', () => {
      const userId = 
      User
        .findOne({email: 'test@test.com'})
        .then(user => {
        return user._id;
      });

      let res;
      return chai.request(app)
        .get('/followedartists/myartists/')
        .send({userId: userId})
        .then(function(response) {
          // so subsequent .then blocks can access response object
          res = response;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          // otherwise our db seeding didn't work
          expect(res.body.artists).to.have.lengthOf(1);
        });

    });
  });

  describe('FollowedArtists - POST', () => {
    it('should add an artist to the followed artists of the creator', () => {
      const userId = 
      User
        .findOne({email: 'test@test.com'})
        .then(user => {
        return user._id;
      });
      const newArtist = {
          body: {
              name: 'Alison Wonderland',
              tour: '2020-06-04',
              url: 'www.testing.com/test',
              userId: userId
          }
      };

      let res;
      return chai.request(app)
        .get('/followedartists/myartists/')
        .send({req: {userId: userId}})
        .then(function(response) {
          res = response;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.artists).to.have.lengthOf(2);
        });
    });
  });

  describe('FollowedArtists - DELETE', () => {
      it('Should remove selected artist from database', () => {
        artistId = 
        Artist
          .findOne({email: 'test@test.com'})
          .then(artist => {
            return artist._id
          });

        return chai.request(app).delete(artistId).then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res).to.have.property({message: 'Artist removed from Followed Artists DB!'});
          return Artists.count();
        })
        .then(count => {
          expect(res.body.artists).to.have.lengthOf(count);
        });
        
      });
  });

    

    

  after(done => {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
