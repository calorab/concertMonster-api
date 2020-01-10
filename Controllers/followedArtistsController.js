const Artist = require('../Models/artist');
const User = require('../Models/user');


exports.getMyArtists = (req, res, next) => {
    Artist
        .find()
        .then(result => {
            res.status(200).json({
                message: 'Artist successfully retrieved!',
                artists: result
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postArtist = (req, res, next) => {
    console.log('REQUEST BODY: ', req.body);
    let creator;
    const artist = new Artist({
        name: req.body.name,
        tour: req.body.tour,
        url: req.body.url,
        creator: req.body.userId
    });

    artist
        .save()
        .then(result => {
            return User.findById(req.body.userId);
        })
        .then(user => {
            creator = user;
            user.artists.push(artist);
            return user.save();
        })
        .then(result => {
            console.log(result, 'post successful');
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.deleteArtist = (req, res, next) => {
    const artistId = req.body.artistId;
    console.log('The REQ...', req);
    Artist
        .findByIdAndRemove(artistId)
        .then(artist => {
            console.log('Got to Then block', artist);
            if (!artist) {
                return res.status(404).json( 'This artist does not exist!');
            }
            res
            .status(200)
            .json(
                {
                    message: 'Artist removed from Followed Artists DB!'
                }
            );
        })
        .catch(err => {
            console.log(err, 'error in deleteArtist');
        });
};