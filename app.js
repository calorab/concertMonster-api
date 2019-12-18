const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const followedArtistsRoutes = require('./Routes/followedArtists');
const searchArtistsRoutes = require('./Routes/searchRoutes');
const authRoutes = require('./Routes/auth');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/followedartists', followedArtistsRoutes);
app.use('/search', searchArtistsRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });

mongoose.connect(
    'mongodb+srv://admin:HM7wwhyy3GcjhzS@cluster0-6akq9.mongodb.net/test?retryWrites=true&w=majority')
    .then(result => {
        app.listen(8080);
        console.log("Listening on 8080");
}).catch(err => console.log('Err on listen', err));