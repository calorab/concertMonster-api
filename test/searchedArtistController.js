const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const mongoose = require('mongoose');

const {app, runServer, closeServer} = require('../app');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

tearDownDb = () => {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
;}

describe('Searched Artists Controller', () => {
    
    before(function() {
        return runServer(TEST_DATABASE_URL);
    });
    
    after(function() {
        return tearDownDb().then(() => { 
            return closeServer()
        }); 
    });

    it('should return list of search results', function() {
        let artistName = 'alison';

        return chai.request(app)
            .get(`/search/artists/${artistName}`)
            .send(artistName)
            .then(res => {
                return list = res.body.results;
            }).then(list => {
                expect(list).to.not.be.null;
                expect(list).to.have.property('artist');
            });
    });
});