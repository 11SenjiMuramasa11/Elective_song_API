const db = require('../config/database');

class Artist {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM artists ORDER BY monthly_listeners DESC');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM artists WHERE artist_id = ?', [id]);
        return rows[0];
    }

    static async getByGenre(genre) {
        const [rows] = await db.query(
            'SELECT * FROM artists WHERE genre = ? ORDER BY monthly_listeners DESC',
            [genre]
        );
        return rows;
    }

    static async getTopArtists(limit = 10) {
        const [rows] = await db.query(
            'SELECT * FROM artists ORDER BY monthly_listeners DESC LIMIT ?',
            [parseInt(limit)]
        );
        return rows;
    }

    static async search(searchTerm) {
        const [rows] = await db.query(
            'SELECT * FROM artists WHERE name LIKE ? ORDER BY monthly_listeners DESC',
            [`%${searchTerm}%`]
        );
        return rows;
    }

    static async create(artistData) {
        const { name, genre, country, bio, image_url, monthly_listeners, verified } = artistData;
        const [result] = await db.query(
            'INSERT INTO artists (name, genre, country, bio, image_url, monthly_listeners, verified) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, genre, country, bio, image_url, monthly_listeners || 0, verified || false]
        );
        return result.insertId;
    }

    static async update(id, artistData) {
        const { name, genre, country, bio, image_url, monthly_listeners, verified } = artistData;
        const [result] = await db.query(
            'UPDATE artists SET name = ?, genre = ?, country = ?, bio = ?, image_url = ?, monthly_listeners = ?, verified = ? WHERE artist_id = ?',
            [name, genre, country, bio, image_url, monthly_listeners, verified, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM artists WHERE artist_id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Artist;