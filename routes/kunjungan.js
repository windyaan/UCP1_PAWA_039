const express = require('express');
const router = express.Router();
const db = require('../database/db'); // Ganti dengan koneksi database Anda

// Menampilkan daftar kunjungan
router.get('/', (req, res) => {
    db.query('SELECT * FROM kunjungan', (err, results) => {
        if (err) return res.status(500).send('Error fetching kunjungan data');
        res.render('kunjungan', { kunjungan: results });
    });
});

// Menambahkan kunjungan baru
router.post('/', (req, res) => {
    const { id, tanggal, jumlah } = req.body;
    db.query('INSERT INTO kunjungan (id, tanggal, jumlah) VALUES (?, ?, ?)', [id, tanggal, jumlah], (err) => {
        if (err) return res.status(500).send('Error adding kunjungan');
        res.redirect('/kunjungan');
    });
});

// Menghapus kunjungan
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM kunjungan WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send('Error deleting kunjungan');
        res.status(200).send('Kunjungan deleted');
    });
});

module.exports = router;
