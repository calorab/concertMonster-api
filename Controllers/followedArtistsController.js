
const Artist = require('../Models/artist');
const User = require('../Models/user');


exports.getMyArtists = (req, res, next) => {
    console.log('UserID::: ', req.userId);
    const userId = req.userId;
    Artist
        .find({creator: userId})
        .then(result => {
            console.log('RESULT.... ', result)
            res.status(200).json({
                message: 'Artists successfully retrieved!',
                artists: result
            });
        })
        .catch(err => {
            console.log(err);
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};


exports.postArtist = (req, res, next) => {
    // console.log('REQUEST BODY: ', req.body);
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
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteArtist = (req, res, next) => {
    const artistId = req.body.artistId;
    const userId = req.body.userId;
    // console.log('ArtistId: ', artistId, 'UserId: ', userId);
    Artist
        .findById(artistId)
        .then(artist => {
            // console.log('Got to Then block', artist);
            if (artist.creator.toString() !== userId) 
            {
                const error = new Error('Not authorized!');
                error.statusCode = 403;
                throw error;
            }
            return Artist.findByIdAndRemove(artistId);
        })
        .then(result => {
            return User.findById(req.body.userId);
        })
        .then(user => {
            user.artists.pull(artistId);
            return user.save();
        })
        .then(result => {
            res.status(200).json(
                {
                    message: 'Artist removed from Followed Artists DB!'
                }
            ); 
        })
        .catch(err => {
            console.log(err);
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};