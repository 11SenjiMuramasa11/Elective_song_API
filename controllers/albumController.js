const Album = require('../models/albumModel');

exports.getAllAlbums = async (req, res) => {
    try {
        const albums = await Album.getAll();
        res.json({
            success: true,
            count: albums.length,
            data: albums
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getAlbumById = async (req, res) => {
    try {
        const album = await Album.getById(req.params.id);
        if (!album) {
            return res.status(404).json({
                success: false,
                error: 'Album not found'
            });
        }
        res.json({
            success: true,
            data: album
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getAlbumsByArtist = async (req, res) => {
    try {
        const albums = await Album.getByArtist(req.params.artistId);
        res.json({
            success: true,
            count: albums.length,
            data: albums
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getAlbumWithSongs = async (req, res) => {
    try {
        const album = await Album.getAlbumWithSongs(req.params.id);
        if (!album) {
            return res.status(404).json({
                success: false,
                error: 'Album not found'
            });
        }
        res.json({
            success: true,
            data: album
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.createAlbum = async (req, res) => {
    try {
        const albumId = await Album.create(req.body);
        const newAlbum = await Album.getById(albumId);
        res.status(201).json({
            success: true,
            message: 'Album created successfully',
            data: newAlbum
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.updateAlbum = async (req, res) => {
    try {
        const affectedRows = await Album.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                error: 'Album not found'
            });
        }
        const updatedAlbum = await Album.getById(req.params.id);
        res.json({
            success: true,
            message: 'Album updated successfully',
            data: updatedAlbum
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.deleteAlbum = async (req, res) => {
    try {
        const affectedRows = await Album.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                error: 'Album not found'
            });
        }
        res.json({
            success: true,
            message: 'Album deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};