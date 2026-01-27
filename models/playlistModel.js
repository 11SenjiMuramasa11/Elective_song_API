const db = require('../config/database');

class Playlist {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM playlists ORDER BY followers DESC');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM playlists WHERE playlist_id = ?', [id]);
        return rows[0];
    }

    static async getPublicPlaylists() {
        const [rows] = await db.query('SELECT * FROM playlists WHERE is_public = TRUE ORDER BY followers DESC');
        return rows;
    }

    static async getPlaylistWithSongs(id) {
        const playlist = await this.getById(id);
        if (!playlist) return null;

        const [songs] = await db.query(`
            SELECT s.*, a.name as artist_name, ps.position, ps.added_at
            FROM playlist_songs ps
            LEFT JOIN songs s ON ps.song_id = s.song_id
            LEFT JOIN artists a ON s.artist_id = a.artist_id
            WHERE ps.playlist_id = ?
            ORDER BY ps.position
        `, [id]);

        return {
            ...playlist,
            songs: songs
        };
    }

    static async create(playlistData) {
        const { name, description, cover_url, is_public, created_by } = playlistData;
        const [result] = await db.query(
            'INSERT INTO playlists (name, description, cover_url, is_public, created_by) VALUES (?, ?, ?, ?, ?)',
            [name, description, cover_url, is_public !== false, created_by || 'User']
        );
        return result.insertId;
    }

    static async update(id, playlistData) {
        const { name, description, cover_url, is_public } = playlistData;
        const [result] = await db.query(
            'UPDATE playlists SET name = ?, description = ?, cover_url = ?, is_public = ? WHERE playlist_id = ?',
            [name, description, cover_url, is_public, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM playlists WHERE playlist_id = ?', [id]);
        return result.affectedRows;
    }

    static async addSong(playlistId, songId, position) {
        const [result] = await db.query(
            'INSERT INTO playlist_songs (playlist_id, song_id, position) VALUES (?, ?, ?)',
            [playlistId, songId, position]
        );
        
        // Update playlist stats
        await db.query(`
            UPDATE playlists p
            SET total_songs = (SELECT COUNT(*) FROM playlist_songs WHERE playlist_id = ?),
                total_duration_seconds = (SELECT SUM(s.duration_seconds) 
                    FROM playlist_songs ps 
                    JOIN songs s ON ps.song_id = s.song_id 
                    WHERE ps.playlist_id = ?)
            WHERE p.playlist_id = ?
        `, [playlistId, playlistId, playlistId]);
        
        return result.insertId;
    }

    static async removeSong(playlistId, songId) {
        const [result] = await db.query(
            'DELETE FROM playlist_songs WHERE playlist_id = ? AND song_id = ?',
            [playlistId, songId]
        );
        
        // Update playlist stats
        await db.query(`
            UPDATE playlists p
            SET total_songs = (SELECT COUNT(*) FROM playlist_songs WHERE playlist_id = ?),
                total_duration_seconds = (SELECT COALESCE(SUM(s.duration_seconds), 0) 
                    FROM playlist_songs ps 
                    JOIN songs s ON ps.song_id = s.song_id 
                    WHERE ps.playlist_id = ?)
            WHERE p.playlist_id = ?
        `, [playlistId, playlistId, playlistId]);
        
        return result.affectedRows;
    }

    static async incrementFollowers(id) {
        const [result] = await db.query('UPDATE playlists SET followers = followers + 1 WHERE playlist_id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Playlist;