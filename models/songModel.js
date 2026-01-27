const db = require('../config/database');

class Song {
    static async getAll() {
        const [rows] = await db.query(`
            SELECT s.*, a.name as artist_name, al.title as album_title
            FROM songs s
            LEFT JOIN artists a ON s.artist_id = a.artist_id
            LEFT JOIN albums al ON s.album_id = al.album_id
            ORDER BY s.plays DESC
        `);
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.query(`
            SELECT s.*, a.name as artist_name, al.title as album_title
            FROM songs s
            LEFT JOIN artists a ON s.artist_id = a.artist_id
            LEFT JOIN albums al ON s.album_id = al.album_id
            WHERE s.song_id = ?
        `, [id]);
        return rows[0];
    }

    static async getByArtist(artistId) {
        const [rows] = await db.query(`
            SELECT s.*, a.name as artist_name, al.title as album_title
            FROM songs s
            LEFT JOIN artists a ON s.artist_id = a.artist_id
            LEFT JOIN albums al ON s.album_id = al.album_id
            WHERE s.artist_id = ?
            ORDER BY s.plays DESC
        `, [artistId]);
        return rows;
    }

    static async getByGenre(genre) {
        const [rows] = await db.query(`
            SELECT s.*, a.name as artist_name, al.title as album_title
            FROM songs s
            LEFT JOIN artists a ON s.artist_id = a.artist_id
            LEFT JOIN albums al ON s.album_id = al.album_id
            WHERE s.genre = ?
            ORDER BY s.plays DESC
        `, [genre]);
        return rows;
    }

    static async getTopSongs(limit = 10) {
        const [rows] = await db.query(`
            SELECT s.*, a.name as artist_name, al.title as album_title
            FROM songs s
            LEFT JOIN artists a ON s.artist_id = a.artist_id
            LEFT JOIN albums al ON s.album_id = al.album_id
            ORDER BY s.plays DESC
            LIMIT ?
        `, [parseInt(limit)]);
        return rows;
    }

    static async search(searchTerm) {
        const [rows] = await db.query(`
            SELECT s.*, a.name as artist_name, al.title as album_title
            FROM songs s
            LEFT JOIN artists a ON s.artist_id = a.artist_id
            LEFT JOIN albums al ON s.album_id = al.album_id
            WHERE s.title LIKE ? OR a.name LIKE ?
            ORDER BY s.plays DESC
        `, [`%${searchTerm}%`, `%${searchTerm}%`]);
        return rows;
    }

    static async create(songData) {
        const { title, artist_id, album_id, duration_seconds, genre, release_date, audio_url, explicit } = songData;
        const [result] = await db.query(
            'INSERT INTO songs (title, artist_id, album_id, duration_seconds, genre, release_date, audio_url, explicit) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [title, artist_id, album_id, duration_seconds, genre, release_date, audio_url, explicit || false]
        );
        return result.insertId;
    }

    static async update(id, songData) {
        const { title, artist_id, album_id, duration_seconds, genre, release_date, plays, likes, audio_url, explicit } = songData;
        const [result] = await db.query(
            'UPDATE songs SET title = ?, artist_id = ?, album_id = ?, duration_seconds = ?, genre = ?, release_date = ?, plays = ?, likes = ?, audio_url = ?, explicit = ? WHERE song_id = ?',
            [title, artist_id, album_id, duration_seconds, genre, release_date, plays, likes, audio_url, explicit, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM songs WHERE song_id = ?', [id]);
        return result.affectedRows;
    }

    static async incrementPlays(id) {
        const [result] = await db.query('UPDATE songs SET plays = plays + 1 WHERE song_id = ?', [id]);
        return result.affectedRows;
    }

    static async incrementLikes(id) {
        const [result] = await db.query('UPDATE songs SET likes = likes + 1 WHERE song_id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Song;