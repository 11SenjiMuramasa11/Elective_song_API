const express = require('express');
const cors = require('cors');

const artistRoutes = require('./routes/artistRoutes');
const songRoutes = require('./routes/songRoutes');
const albumRoutes = require('./routes/albumRoutes');
const playlistRoutes = require('./routes/playlistRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome route
app.get('/', (req, res) => {
    res.json({
        message: '🎵 Welcome to Music Streaming API',
        version: '1.0.0',
        endpoints: {
            artists: '/api/artists',
            songs: '/api/songs',
            albums: '/api/albums',
            playlists: '/api/playlists'
        },
        documentation: 'Use the endpoints above to access music data'
    });
});

// API Routes
app.use('/api/artists', artistRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/playlists', playlistRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        message: 'The requested resource does not exist'
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

module.exports = app;