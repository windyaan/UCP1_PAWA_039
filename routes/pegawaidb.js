const express = require('express');
const router = express.Router();
const db = require('../database/db'); // Mengimpor koneksi database

// Endpoint untuk mendapatkan semua pegawai
router.get('/', (req, res) => {
    db.query('SELECT * FROM pegawai', (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.json(results);
    });
});

// Endpoint untuk mendapatkan pegawai berdasarkan ID
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM pegawai WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.length === 0) return res.status(404).send('Pegawai tidak ditemukan');
        res.json(results[0]);
    });
});

// Endpoint untuk menambahkan pegawai baru
router.post('/', (req, res) => {
    const { nama, notelp, alamat, status } = req.body;

    if (!nama || !notelp || !alamat || !status) {
        return res.status(400).send('Semua atribut (nama, notelp, alamat, status) harus diisi');
    }

    db.query(
        'INSERT INTO pegawai (nama, notelp, alamat, status) VALUES (?, ?, ?, ?)',
        [nama.trim(), notelp.trim(), alamat.trim(), status.trim()],
        (err, results) => {
            if (err) return res.status(500).send('Internal Server Error');
            const newPegawai = { id: results.insertId, nama, notelp, alamat, status };
            res.status(201).json(newPegawai);
        }
    );
});

// Endpoint untuk memperbarui data pegawai
router.put('/:id', (req, res) => {
    const { nama, notelp, alamat, status } = req.body;

    db.query(
        'UPDATE pegawai SET nama = ?, notelp = ?, alamat = ?, status = ? WHERE id = ?',
        [nama, notelp, alamat, status, req.params.id],
        (err, results) => {
            if (err) return res.status(500).send('Internal Server Error');
            if (results.affectedRows === 0) return res.status(404).send('Pegawai tidak ditemukan');
            res.json({ id: req.params.id, nama, notelp, alamat, status });
        }
    );
});

// Endpoint untuk menghapus data pegawai
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM pegawai WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.affectedRows === 0) return res.status(404).send('Pegawai tidak ditemukan');
        res.status(204).send();
    });
});

module.exports = router;