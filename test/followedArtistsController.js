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
  
  User.create(
    {
      email: 'test@test.com', 
      password: '123456'
    }
  )
  .then(user => {
    console.log('User Created!!!' + user);
    const artist = new Artist({
        name: "Halsey",
        tour: "2020-06-04",
        url: "http://www.songkick.com/artists/203876-alison-krauss?utm_source=54847&utm_medium=partner",
        creator: user._id 
      });
      console.log('Artist Created!!!' + artist)
      return artist.save();
  })
  .then(artist => {
    Artist.findOne(artist._id).then(artist => console.log('THE ARTIST IN GENERATEDATA ', artist))
  })
  .catch(err => {
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
    it('should get all artists followed by creator', function() { 
      console.log('Start - GET REQ ');
      userId =
        User.findOne({name: "Halsey"}).then(user => {
          return user._id;
        });
      let res;
      return chai.request(app)
        .get('/followedartists/myartists')
        .send({req: {userId: userId}})
        .then(response => {
          console.log('HERES THE RESPONSE FOR GET ', response.body);
          res = response.body;
          expect(res).to.have.property('message');
          expect(res).to.be.a('object');
          expect(res.artists).to.have.lengthOf(0);
        });
    });
  });

  describe('FollowedArtists - POST', function() {
    it('should add an artist to the followed artists of the creator', function() {
      console.log('Start - POST REQ ');

      userId = 
        User.find({email: 'test@test.com'}).then(user => {
          console.log('POST getting userId ', user)
          return user._id;
        });
      
      return chai.request(app)
        .post('/followedartists/myartist')
        .send(
          {
            req: 
            {
              body: {
                name: 'Dermot kennedy',
                tour: '2020-10-8',
                url: 'www.somewebsite.com',
                userId: userId
              }
            }
          }
        )
        .then(res => {
          console.log('HERES THE RESPONSE FOR POST ', res.body);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.artists).to.have.lengthOf(1);
        });  
    });
  });

  describe('FollowedArtists - DELETE', function() { 
    it('Should remove selected artist from database', function() {
      console.log('Start - DELETE REQ '); 
      let user;
      let artist;
      User.find({email: 'test@test.com'}).then(user => {
        console.log('STEP TWO', user);
        return user._id;
      })
      .then(userId => {
        Artist.findOne({creator: userId}).then(artist => {
          console.log('STEP ONE', artist);
          return artist._id;
        })
      })
      .then(artistId => {
        // console.log('DELETE RESPONSE ')
        return chai.request(app)
        .delete('/followedartists/deleteartist')
        .send({
          req: {
            body: {
              artistId: artistId,
              userId: userId
            }
          }
        })
        .then(res => {
          console.log('STEP THREE ', res.body);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res).to.have.property({ message: 'Artist removed from Followed Artists DB!' });
          expect(res.body.artists).to.have.lengthOf(0);
        }); 
      }); 
    });
  });
});
