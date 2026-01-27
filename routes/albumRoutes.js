const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

// GET routes
router.get('/', albumController.getAllAlbums);
router.get('/artist/:artistId', albumController.getAlbumsByArtist);
router.get('/:id', albumController.getAlbumById);
router.get('/:id/songs', albumController.getAlbumWithSongs);

// POST routes
router.post('/', albumController.createAlbum);

// PUT routes
router.put('/:id', albumController.updateAlbum);

// DELETE routes
router.delete('/:id', albumController.deleteAlbum);

module.exports = router;