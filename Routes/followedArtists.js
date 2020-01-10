const express = require('express');

const router = express.Router();

const followedArtistsController = require('../Controllers/followedArtistsController');

// GET /myArtists
router.get('/myartists', followedArtistsController.getMyArtists); 

// POST /myArtist
router.post('/myartist', followedArtistsController.postArtist);

// DELETE /myArtists
router.delete('/deleteartist', followedArtistsController.deleteArtist);

module.exports = router;