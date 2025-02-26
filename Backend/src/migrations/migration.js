const mysql = require("mysql2")
const koneksi = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
})

const createUserTable = (koneksi) => {
    const q = `CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL
    )`
koneksi.query(q, (err, result) => {
    if (err) {
        console.error("error buat table users", err.stack)
        return
    }
    console.log("table users berhasil dibuat")
})
}

const createMembersTable = (koneksi) => {
    const q = `CREATE TABLE IF NOT EXISTS members(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100),
    no_hp VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL
    )`
koneksi.query(q, (err, result) => {
    if (err) {
        console.error("error saat membuat table members", err.stack)
        return
    }
    console.log("Table members berhasil dibuat")
})
}

const createPaketWisata = (koneksi) => {
    const q = `
    CREATE TABLE IF NOT EXISTS paket_wisata(
    id INT AUTO_INCREMENT PRIMARY KEY,
    namapaket VARCHAR(100),
    deskripsi TEXT,
    lokasi_wisata VARCHAR(100),
    harga DECIMAL(10,2),
    foto VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL
    )`
koneksi.query(q, (err, result) => {
    if (err) {
        console.error("eror saat membuat table paket wisata", err.stack)
        return
    }
    console.log("table paket wisata berhasil dibuat")
})
}

const createBooking = (koneksi) => {
    const q = `
    CREATE TABLE IF NOT EXISTS booking(
    id INT AUTO_INCREMENT PRIMARY KEY,
    members_id INT,
    tgl_pemesanan TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (members_id) REFERENCES members(id)
    )`
koneksi.query(q, (err, result) => {
    if (err) {
        console.error("eror saat membuat table booking", err.stack)
        return
    }
    console.log("table booking berhasil di buat")
})
}

const createBookingDetail = (koneksi) => {
    const q = `
    CREATE TABLE IF NOT EXISTS booking_detail(
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT,
    paketwisata_id INT,
    jumlah_orang INT,
    harga DECIMAL(10,2),
    total DECIMAL(10,2),
    status_pembayaran ENUM('Belum Dibayar', 'Sudah Dibayar'),
    file VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (booking_id) REFERENCES booking(id),
    FOREIGN KEY (paketwisata_id) REFERENCES paket_wisata(id)
    )`
koneksi.query(q, (err, result) => {
    if (err) {
        console.error("error saat membuat table booking detail", err.stack)
        return
    }
    console.log("berhasil membuat tamble booking detail")
})
}

const createKendaraan = (koneksi) => {
    const q = `
    CREATE TABLE IF NOT EXISTS kendaraan(
    id INT AUTO_INCREMENT PRIMARY KEY,
    merk VARCHAR(100),
    jenis_kendaraan ENUM('mobil','bis','travel'),
    plat_no VARCHAR(20),
    kapasitas INT,
    harga DECIMAL(10,2),
    status_kendaraan ENUM('tersedia','tidak tersedia'),
    foto VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL)`
koneksi.query(q, (err, result) => {
    if (err) {
        console.error("error saat membuat table kendaraan", err.stack)
        return
    }
    console.log("berhasil membua table kendaraan")
})
}

const createRentals = (koneksi) => {
    const q = `
    CREATE TABLE IF NOT EXISTS rentals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kendaraan_id INT,
    members_id INT,
    tgl_sewa DATE,
    tgl_kembali DATE,
    harga DECIMAL(10,2),
    status_pembayaran ENUM('Belum Dibayar', 'Sudah Dibayar'),
    status_sewa ENUM('Menunggu Pembayaran', 'Pending', 'Disewa', 'Selesai'),
    file VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (kendaraan_id) REFERENCES kendaraan(id),
    FOREIGN KEY (members_id) REFERENCES members(id)
    )`
koneksi.query(q, (err, result) => {
    if (err) {
        console.error("error saat membuat table rentals", err.stack)
        return
    }
    console.log("berhasil membuat table rentals")
})
}

const migration = () => {
    koneksi.connect((err) => {
        if (err) {
            console.error("gagal koneksi ke database", err.stack)
            return
        }
        console.log("Koneksi ke database berhasil")
    koneksi.query(
        "CREATE DATABASE IF NOT EXISTS db_tour_and_travel",(err, result) => {
            if (err) {
                console.error("error saat membuat database", err.result)
                return
            }
            console.log("database berhasil dibuat atau database sudah ada")

            const db = require("../models/db")
            createUserTable(db)
            createMembersTable(db)
            createPaketWisata(db)
            createBooking(db)
            createBookingDetail(db)
            createKendaraan(db)
            createRentals(db)
        }
    )
    })
}

module.exports = migration