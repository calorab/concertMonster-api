const express = require('express');

const router = express.Router();

const searchController = require('../Controllers/searchController');

// GET /searchArtists
router.get('/searchartists', searchController.getArtistResults);

// GET /searchConcerts
router.get('/searchconcerts', searchController.getConcertResults);

module.exports = router;