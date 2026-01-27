const db = require('../config/database');

class Album {
    static async getAll() {
        const [rows] = await db.query(`
            SELECT al.*, a.name as artist_name
            FROM albums al
            LEFT JOIN artists a ON al.artist_id = a.artist_id
            ORDER BY al.release_date DESC
        `);
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.query(`
            SELECT al.*, a.name as artist_name
            FROM albums al
            LEFT JOIN artists a ON al.artist_id = a.artist_id
            WHERE al.album_id = ?
        `, [id]);
        return rows[0];
    }

    static async getByArtist(artistId) {
        const [rows] = await db.query(`
            SELECT al.*, a.name as artist_name
            FROM albums al
            LEFT JOIN artists a ON al.artist_id = a.artist_id
            WHERE al.artist_id = ?
            ORDER BY al.release_date DESC
        `, [artistId]);
        return rows;
    }

    static async getAlbumWithSongs(id) {
        const album = await this.getById(id);
        if (!album) return null;

        const [songs] = await db.query(`
            SELECT s.*, a.name as artist_name
            FROM songs s
            LEFT JOIN artists a ON s.artist_id = a.artist_id
            WHERE s.album_id = ?
            ORDER BY s.song_id
        `, [id]);

        return {
            ...album,
            songs: songs
        };
    }

    static async create(albumData) {
        const { title, artist_id, release_date, genre, cover_url, total_tracks, duration_seconds, label } = albumData;
        const [result] = await db.query(
            'INSERT INTO albums (title, artist_id, release_date, genre, cover_url, total_tracks, duration_seconds, label) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [title, artist_id, release_date, genre, cover_url, total_tracks || 0, duration_seconds || 0, label]
        );
        return result.insertId;
    }

    static async update(id, albumData) {
        const { title, artist_id, release_date, genre, cover_url, total_tracks, duration_seconds, label } = albumData;
        const [result] = await db.query(
            'UPDATE albums SET title = ?, artist_id = ?, release_date = ?, genre = ?, cover_url = ?, total_tracks = ?, duration_seconds = ?, label = ? WHERE album_id = ?',
            [title, artist_id, release_date, genre, cover_url, total_tracks, duration_seconds, label, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM albums WHERE album_id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Album;