const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

// GET routes
router.get('/', playlistController.getAllPlaylists);
router.get('/public', playlistController.getPublicPlaylists);
router.get('/:id', playlistController.getPlaylistById);
router.get('/:id/songs', playlistController.getPlaylistWithSongs);

// POST routes
router.post('/', playlistController.createPlaylist);
router.post('/:id/songs', playlistController.addSongToPlaylist);
router.post('/:id/follow', playlistController.followPlaylist);

// PUT routes
router.put('/:id', playlistController.updatePlaylist);

// DELETE routes
router.delete('/:id', playlistController.deletePlaylist);
router.delete('/:id/songs/:songId', playlistController.removeSongFromPlaylist);

module.exports = router;