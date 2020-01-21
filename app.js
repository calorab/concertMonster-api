const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const { PORT, DATABASE_URL } = require('./config');

const followedArtistsRoutes = require('./Routes/followedArtists');
const searchArtistsRoutes = require('./Routes/searchRoutes');
const authRoutes = require('./Routes/auth');

mongoose.Promise = global.Promise;
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

// mongoose.connect(
//     'mongodb+srv://admin:HM7wwhyy3GcjhzS@cluster0-6akq9.mongodb.net/test?retryWrites=true&w=majority')
//     .then(result => {
//         app.listen(8080);
//         console.log("Listening on 8080");
// }).catch(err => console.log('Err on listen', err));

// module.exports = app.listen(8080);
let server;
function runServer(databaseUrl, port = PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          console.log('Err on listen', err);
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}


if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };