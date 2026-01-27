require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🎵 Music Streaming API Server is running on port ${PORT}`);
    console.log(`📡 Access the API at: http://localhost:${PORT}`);
});