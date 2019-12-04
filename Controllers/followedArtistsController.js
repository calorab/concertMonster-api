const Artist = require('../Models/artist');


exports.getMyArtists = (req, res, next) => {
    Artist
        .find()
        .then(result => {
            console.log(result);
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
    const artist = new Artist({
        name: req.body.name,
        genre: req.body.genre,
        url: req.body.url
    });

    artist
        .save()
        .then(result => {
            console.log(result, 'post success');
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.deleteArtist = (req, res, next) => {
    const artistId = '5de81386d755a40fdb74fb13';
    Artist
        .findByIdAndRemove(artistId)
        .then(artist => {
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