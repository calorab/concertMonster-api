const express = require('express');

const bodyParser = require('body-parser');

const followedArtistsRoutes = require('./Routes/followedArtists');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(followedArtistsRoutes);

app.listen(8080);