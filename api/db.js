import mysql from 'mysql2/promise';

export default async function handler(req, res) {
    try {
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const [rows] = await db.execute("SELECT * FROM ndb1 LIMIT 10"); // Use `ndb1` (your actual table)
        await db.end(); // Close connection to avoid memory leaks

        res.status(200).json(rows);
    } catch (err) {
        console.error("MySQL Error:", err.message);
        res.status(500).json({ error: err.message });
    }
}
