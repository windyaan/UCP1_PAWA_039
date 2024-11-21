const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000; // Default port jika tidak ada di .env
const kunjungan = require('./routes/kunjungan'); // Rute untuk kunjungan
const pegawai = require('./routes/pegawai'); // Rute untuk pegawai

// Middleware
app.use(express.json()); // Parsing JSON
app.use(express.urlencoded({ extended: true })); // Parsing form data
app.use(express.static('public')); // Folder untuk file statis (CSS, JS)

// View Engine
app.set('view engine', 'ejs');

// Routes
app.use('/kunjungan', kunjungan); // Rute untuk kunjungan
app.use('/pegawai', pegawai); // Rute untuk pegawai

// Rute untuk halaman utama
app.get('/', (req, res) => {
    res.render('index'); // Merender views/index.ejs
});

// Server Listener
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
