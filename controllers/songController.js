const Song = require('../models/songModel');

exports.getAllSongs = async (req, res) => {
    try {
        const songs = await Song.getAll();
        res.json({
            success: true,
            count: songs.length,
            data: songs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getSongById = async (req, res) => {
    try {
        const song = await Song.getById(req.params.id);
        if (!song) {
            return res.status(404).json({
                success: false,
                error: 'Song not found'
            });
        }
        res.json({
            success: true,
            data: song
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getSongsByArtist = async (req, res) => {
    try {
        const songs = await Song.getByArtist(req.params.artistId);
        res.json({
            success: true,
            count: songs.length,
            data: songs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getSongsByGenre = async (req, res) => {
    try {
        const songs = await Song.getByGenre(req.params.genre);
        res.json({
            success: true,
            count: songs.length,
            data: songs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getTopSongs = async (req, res) => {
    try {
        const limit = req.query.limit || 10;
        const songs = await Song.getTopSongs(limit);
        res.json({
            success: true,
            count: songs.length,
            data: songs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.searchSongs = async (req, res) => {
    try {
        const searchTerm = req.query.q;
        if (!searchTerm) {
            return res.status(400).json({
                success: false,
                error: 'Search term is required'
            });
        }
        const songs = await Song.search(searchTerm);
        res.json({
            success: true,
            count: songs.length,
            data: songs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.createSong = async (req, res) => {
    try {
        const songId = await Song.create(req.body);
        const newSong = await Song.getById(songId);
        res.status(201).json({
            success: true,
            message: 'Song created successfully',
            data: newSong
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.updateSong = async (req, res) => {
    try {
        const affectedRows = await Song.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                error: 'Song not found'
            });
        }
        const updatedSong = await Song.getById(req.params.id);
        res.json({
            success: true,
            message: 'Song updated successfully',
            data: updatedSong
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.deleteSong = async (req, res) => {
    try {
        const affectedRows = await Song.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                error: 'Song not found'
            });
        }
        res.json({
            success: true,
            message: 'Song deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.playSong = async (req, res) => {
    try {
        await Song.incrementPlays(req.params.id);
        const song = await Song.getById(req.params.id);
        res.json({
            success: true,
            message: 'Play count incremented',
            data: song
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.likeSong = async (req, res) => {
    try {
        await Song.incrementLikes(req.params.id);
        const song = await Song.getById(req.params.id);
        res.json({
            success: true,
            message: 'Song liked',
            data: song
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};