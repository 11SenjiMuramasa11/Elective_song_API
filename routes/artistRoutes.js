const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');

// GET routes
router.get('/', artistController.getAllArtists);
router.get('/search', artistController.searchArtists);
router.get('/top', artistController.getTopArtists);
router.get('/genre/:genre', artistController.getArtistsByGenre);
router.get('/:id', artistController.getArtistById);

// POST routes
router.post('/', artistController.createArtist);

// PUT routes
router.put('/:id', artistController.updateArtist);

// DELETE routes
router.delete('/:id', artistController.deleteArtist);

module.exports = router;