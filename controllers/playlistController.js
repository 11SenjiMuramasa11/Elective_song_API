const Playlist = require('../models/playlistModel');

exports.getAllPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.getAll();
        res.json({
            success: true,
            count: playlists.length,
            data: playlists
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getPlaylistById = async (req, res) => {
    try {
        const playlist = await Playlist.getById(req.params.id);
        if (!playlist) {
            return res.status(404).json({
                success: false,
                error: 'Playlist not found'
            });
        }
        res.json({
            success: true,
            data: playlist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getPublicPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.getPublicPlaylists();
        res.json({
            success: true,
            count: playlists.length,
            data: playlists
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getPlaylistWithSongs = async (req, res) => {
    try {
        const playlist = await Playlist.getPlaylistWithSongs(req.params.id);
        if (!playlist) {
            return res.status(404).json({
                success: false,
                error: 'Playlist not found'
            });
        }
        res.json({
            success: true,
            data: playlist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.createPlaylist = async (req, res) => {
    try {
        const playlistId = await Playlist.create(req.body);
        const newPlaylist = await Playlist.getById(playlistId);
        res.status(201).json({
            success: true,
            message: 'Playlist created successfully',
            data: newPlaylist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.updatePlaylist = async (req, res) => {
    try {
        const affectedRows = await Playlist.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                error: 'Playlist not found'
            });
        }
        const updatedPlaylist = await Playlist.getById(req.params.id);
        res.json({
            success: true,
            message: 'Playlist updated successfully',
            data: updatedPlaylist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.deletePlaylist = async (req, res) => {
    try {
        const affectedRows = await Playlist.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                error: 'Playlist not found'
            });
        }
        res.json({
            success: true,
            message: 'Playlist deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.addSongToPlaylist = async (req, res) => {
    try {
        const { song_id, position } = req.body;
        await Playlist.addSong(req.params.id, song_id, position);
        const playlist = await Playlist.getPlaylistWithSongs(req.params.id);
        res.json({
            success: true,
            message: 'Song added to playlist',
            data: playlist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.removeSongFromPlaylist = async (req, res) => {
    try {
        await Playlist.removeSong(req.params.id, req.params.songId);
        const playlist = await Playlist.getPlaylistWithSongs(req.params.id);
        res.json({
            success: true,
            message: 'Song removed from playlist',
            data: playlist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.followPlaylist = async (req, res) => {
    try {
        await Playlist.incrementFollowers(req.params.id);
        const playlist = await Playlist.getById(req.params.id);
        res.json({
            success: true,
            message: 'Playlist followed',
            data: playlist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};