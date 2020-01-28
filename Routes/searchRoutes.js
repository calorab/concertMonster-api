const express = require('express');
const router = express.Router();

const searchController = require('../Controllers/searchController');

// GET /searchArtists
router.get('/artists/:artistName', searchController.getArtistResults);

module.exports = router;
