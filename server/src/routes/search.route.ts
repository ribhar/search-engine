import express = require('express');
import searchController = require('../controllers/search.controller');

const router = express.Router();

// Handle GET requests to the root path
router.get('/', searchController.searchPosts);

module.exports = router;
