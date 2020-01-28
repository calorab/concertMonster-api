const expect = require('chai').expect;
const faker = require('faker');
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const bcrypt = require('bcryptjs');



const User = require('../Models/user');
const {app, runServer, closeServer} = require('../app');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

generateUser = () => {
    console.log('Inside generateData() ');
    let userEmail = 'test@test.com';
    let userPassword = '12345'
    bcrypt
        .hash(userPassword, 12)
        .then(hashedPassword => {
            let user = User.create({
                email: userEmail,
                password: hashedPassword
            });
            return user;
        })
        .then(user => {
            return user;  
        })
        .catch(err => {
            console.log(err);
            return err;
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
          return generateUser();
        });
    });
    
    after(function() {
    return tearDownDb().then(() => { 
        return closeServer()}); 
    });
    

    describe('Auth - signup', () => {
      
        it('should create a new user', function() {
            let newUser = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
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
