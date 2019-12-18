const express = require('express');

const router = express.Router();

const searchController = require('../Controllers/searchController');

// GET /searchArtists
router.get('/artists', searchController.getArtistResults);

// GET /searchConcerts
router.get('/concerts', searchController.getConcertResults);

module.exports = router;
