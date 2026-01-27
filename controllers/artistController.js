const Artist = require('../models/artistModel');

exports.getAllArtists = async (req, res) => {
    try {
        const artists = await Artist.getAll();
        res.json({
            success: true,
            count: artists.length,
            data: artists
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getArtistById = async (req, res) => {
    try {
        const artist = await Artist.getById(req.params.id);
        if (!artist) {
            return res.status(404).json({
                success: false,
                error: 'Artist not found'
            });
        }
        res.json({
            success: true,
            data: artist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getArtistsByGenre = async (req, res) => {
    try {
        const artists = await Artist.getByGenre(req.params.genre);
        res.json({
            success: true,
            count: artists.length,
            data: artists
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getTopArtists = async (req, res) => {
    try {
        const limit = req.query.limit || 10;
        const artists = await Artist.getTopArtists(limit);
        res.json({
            success: true,
            count: artists.length,
            data: artists
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.searchArtists = async (req, res) => {
    try {
        const searchTerm = req.query.q;
        if (!searchTerm) {
            return res.status(400).json({
                success: false,
                error: 'Search term is required'
            });
        }
        const artists = await Artist.search(searchTerm);
        res.json({
            success: true,
            count: artists.length,
            data: artists
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.createArtist = async (req, res) => {
    try {
        const artistId = await Artist.create(req.body);
        const newArtist = await Artist.getById(artistId);
        res.status(201).json({
            success: true,
            message: 'Artist created successfully',
            data: newArtist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.updateArtist = async (req, res) => {
    try {
        const affectedRows = await Artist.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                error: 'Artist not found'
            });
        }
        const updatedArtist = await Artist.getById(req.params.id);
        res.json({
            success: true,
            message: 'Artist updated successfully',
            data: updatedArtist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.deleteArtist = async (req, res) => {
    try {
        const affectedRows = await Artist.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                error: 'Artist not found'
            });
        }
        res.json({
            success: true,
            message: 'Artist deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};