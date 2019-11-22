const express = require('express');

const router = express.Router();

const followedArtistsController = require('../Controllers/followedArtists');

// GET /myArtists
router.get('/myartists', followedArtistsController.getArtists);

// POST /myArtist
router.post('/myartist', followedArtistsController.postArtist);




module.exports = router;