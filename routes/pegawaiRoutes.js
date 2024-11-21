const express = require('express');
const router = express.Router();
const db = require('../database/db'); // Ganti dengan koneksi database Anda

// Menampilkan daftar pegawai
router.get('/', (req, res) => {
    db.query('SELECT * FROM pegawai', (err, results) => {
        if (err) return res.status(500).send('Error fetching pegawai data');
        res.render('pegawai', { pegawai: results });
    });
});

// Menambahkan pegawai baru
router.post('/', (req, res) => {
    const { nama, notelp, alamat, status } = req.body;
    db.query('INSERT INTO pegawai (nama, notelp, alamat, status) VALUES (?, ?, ?, ?)', [nama, notelp, alamat, status], (err) => {
        if (err) return res.status(500).send('Error adding pegawai');
        res.redirect('/pegawai');
    });
});

// Menghapus pegawai
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM pegawai WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send('Error deleting pegawai');
        res.status(200).send('Pegawai deleted');
    });
});

module.exports = router;
