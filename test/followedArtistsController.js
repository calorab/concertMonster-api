const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const mongoose = require('mongoose');

const User = require('../Models/user');
const Artist = require('../Models/artist');
const {app, runServer, closeServer} = require('../app');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

generateData = () => {
  return new Promise((resolve, reject) => {
    const user = new User({
      email: 'test@test.com',
      password: '123456'
    });
    console.log('User Created!!!' + user);
    return user.save(function (err, user) {
      if (err) return console.error('user.save() error: ', err);
      console.log('In user.save()', user);
    }); 
  })
  .then(user => {
    console.log("here!!!");
    const artist = new Artist({
      name: "Halsey",
      tour: "2020-06-04",
      url: "http://www.songkick.com/artists/203876-alison-krauss?utm_source=54847&utm_medium=partner",
      creator: user._id 
    });
    console.log('Artist Created!!!' + artist)
    return artist.save();
  }).catch(err => {
    console.log(err);
    return err;
  });
};

tearDownDb = () => {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

describe('Followed Artists Controller', function() {

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return generateData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });


  describe('FollowedArtists - GET', function() {
    it('should get all artists followed by creator', () => {
      const userId = 
      User
        .findOne({email: 'test@test.com'})
        .then(user => {
        return user._id;
      });

      let res;
      return chai.request(app)
        .get('/followedartists/myartists')
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

  describe('FollowedArtists - POST', function() {
    it('should add an artist to the followed artists of the creator', () => {
      const userId = 
      User
        .findOne({email: 'test@test.com'})
        .then(user => {
        return user._id;
      });

      let res;
      return chai.request(app)
        .get('/followedartists/myartists/')
        .send({req: {userId: userId}})
        .then(function(response) {
          res = response;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.artists).to.have.lengthOf(1);
        });
    });
  });

  describe('FollowedArtists - DELETE', function() {

    
    it('Should remove selected artist from database', () => {

      artistId = 
      Artist
        .findOne({email: 'test@test.com'})
        .then(artist => {
          console.log(artist._id);
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
});
