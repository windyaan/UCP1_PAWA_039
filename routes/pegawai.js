const express = require('express');
const router = express.Router();

let pegawai = [
    {
        id: 1,
        nama: "Budi",
        notelp: "081234567890",
        alamat: "Jl. Merdeka No. 1",
        status: "Tetap"
    },
    {
        id: 2,
        nama: "Siti",
        notelp: "089876543210",
        alamat: "Jl. Proklamasi No. 10",
        status: "Kontrak"
    },
];

// GET method (mengambil daftar pegawai)
router.get('/', (req, res) => {
    res.json(pegawai);
});

// POST method (menambahkan pegawai baru)
router.post('/', (req, res) => {
    const newPegawai = {
        id: pegawai.length + 1,
        nama: req.body.nama,
        notelp: req.body.notelp,
        alamat: req.body.alamat,
        status: req.body.status // Harus berupa 'Tetap' atau 'Kontrak'
    };

    // Validasi input status
    if (!["Tetap", "Kontrak"].includes(newPegawai.status)) {
        return res.status(400).json({ message: "Status harus berupa 'Tetap' atau 'Kontrak'" });
    }

    pegawai.push(newPegawai);
    res.status(201).json(newPegawai);
});

// DELETE method (menghapus pegawai)
router.delete('/:id', (req, res) => {
    const pegawaiIndex = pegawai.findIndex(p => p.id === parseInt(req.params.id));
    if (pegawaiIndex === -1) return res.status(404).json({ message: 'Pegawai tidak ditemukan' });

    const deletedPegawai = pegawai.splice(pegawaiIndex, 1)[0];
    res.status(200).json({ message: `Pegawai '${deletedPegawai.nama}' telah dihapus` });
});

// PUT method (memperbarui data pegawai)
router.put('/:id', (req, res) => {
    const pegawaiData = pegawai.find(p => p.id === parseInt(req.params.id));
    if (!pegawaiData) return res.status(404).json({ message: 'Pegawai tidak ditemukan' });

    pegawaiData.nama = req.body.nama || pegawaiData.nama;
    pegawaiData.notelp = req.body.notelp || pegawaiData.notelp;
    pegawaiData.alamat = req.body.alamat || pegawaiData.alamat;

    if (req.body.status) {
        if (!["Tetap", "Kontrak"].includes(req.body.status)) {
            return res.status(400).json({ message: "Status harus berupa 'Tetap' atau 'Kontrak'" });
        }
        pegawaiData.status = req.body.status;
    }

    res.status(200).json({
        message: `Data pegawai dengan ID ${pegawaiData.id} telah diperbarui`,
        updatedPegawai: pegawaiData
    });
});

module.exports = router;