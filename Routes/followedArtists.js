const express = require('express');

const router = express.Router();
const isAuth = require('../Middleware/isAuth');

const followedArtistsController = require('../Controllers/followedArtistsController');

// GET /myArtists -----  removed isAuth, below
router.get('/myartists', followedArtistsController.getMyArtists); 

// POST /myArtist
router.post('/myartist', followedArtistsController.postArtist);

// DELETE /myArtists
router.delete('/deleteartist', followedArtistsController.deleteArtist);

module.exports = router;