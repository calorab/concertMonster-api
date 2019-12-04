const FollowedArtists = require('../Models/artist');


exports.getMyArtists = (req, res, next) => {
    res.status(200).json({message: 'Hello World!'})
};

exports.postArtist = (req, res, next) => {
    const name = req.body.name;
    const genre = req.body.genre;
    const url = req.body.url;

    res.status(201).json({
        artist: { name: name, genre: genre, url: url }
    });
};

exports.deleteArtist = (req, res, next) => {
    res.status(200).json({message: 'Artist removed from your Dashboard!'});
};