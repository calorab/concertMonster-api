const expect = require('chai').expect;
const faker = require('faker');
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');



const User = require('../Models/user');
const {app, runServer, closeServer} = require('../app');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

generateData = () => {
    console.log('Inside generateData() ');
    User.create(
      {
        email: 'test@test.com', 
        password: '12345'
      }
    )
    .then(user => {
        console.log('User created: ', user);
        return user;  
    });
}

tearDownDb = () => {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}

describe('Auth Controller', () => {
  
    before(function() {
        console.log('Before function ');
        return runServer(TEST_DATABASE_URL).then(() => {
          return generateData();
        });
    });
    
    after(function() {
    return tearDownDb().then(() => { 
        return closeServer()}); 
    });

    describe('Auth - signup', () => {
  
        it('should throw an error on signup', function() {
            let newUser = {
                email: 'test@test.com',
                password: faker.internet.password()
            };
            return chai.request(app)
                .post('/auth/signup')
                .send(newUser)
                .then(res => {
                    expect(res).to.have.status(500);
                    expect(res).to.be.json;
                });
        }); 
      
        it('should create a new user', function() {
            let newUser = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            console.log('The New user ', newUser);
            return chai.request(app)
                .post('/auth/signup')
                .send(newUser)
                .then(res => {
                    console.log('Result: ', res.body)
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                });
        });
      
    });

    describe('Auth - Login', () => {
        it('should login the user', function() {
            let repeatUser = {
                email: 'test@test.com',
                password: '12345'
            };
            
            return chai.request(app)
                .post('/auth/login')
                .send(repeatUser)
                .then(res => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                });
        });

        it('should throw error if email not found', function() {
            let notAUser = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            return chai.request(app)
                .post('/auth/login')
                .send(notAUser)
                .then(res => {
                    expect(res).to.have.status(500);
                    expect(res).to.be.json;
                });
        });
    });

  
  
});
