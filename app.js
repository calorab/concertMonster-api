const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const followedArtistsRoutes = require('./Routes/followedArtists');
const searchArtistsRoutes = require('./Routes/followedArtists');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(followedArtistsRoutes);
app.use(searchArtistsRoutes);

mongoose.connect(
    'mongodb+srv://admin:HM7wwhyy3GcjhzS@cluster0-6akq9.mongodb.net/test?retryWrites=true&w=majority')
    .then(result => {
        app.listen(8080);
        console.log("Listening on 8080");
}).catch(err => console.log('Err on listen', err));