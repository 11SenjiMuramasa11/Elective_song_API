const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');

// GET routes
router.get('/', songController.getAllSongs);
router.get('/search', songController.searchSongs);
router.get('/top', songController.getTopSongs);
router.get('/genre/:genre', songController.getSongsByGenre);
router.get('/artist/:artistId', songController.getSongsByArtist);
router.get('/:id', songController.getSongById);

// POST routes
router.post('/', songController.createSong);
router.post('/:id/play', songController.playSong);
router.post('/:id/like', songController.likeSong);

// PUT routes
router.put('/:id', songController.updateSong);

// DELETE routes
router.delete('/:id', songController.deleteSong);

module.exports = router;