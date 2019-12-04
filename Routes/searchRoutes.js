const express = require('express');

const router = express.Router();

const searchArtistsController = require('../Controllers/searchController');

// GET /searchArtists
router.get('/searchartists', searchController.getArtistResults);

// GET /searchConcerts
router.get('/searchconcerts', searchController.getConcertResults);

module.exports = router;