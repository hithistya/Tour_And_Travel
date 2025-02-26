const koneksi = require("./db")

const selectBD = (callback) => {
    const q = `
    SELECT 
    bd.id, 
    DATE_FORMAT(b.tgl_pemesanan, '%d %M %Y') AS tgl_pemesanan,
    m.nama AS nama_member, 
    p.namapaket, 
    bd.jumlah_orang, 
    bd.harga, 
    bd.total, 
    bd.status_pembayaran, 
    bd.file, 
    bd.created_at
    FROM booking_detail bd
    JOIN booking b ON bd.booking_id = b.id
    JOIN members m ON b.members_id = m.id
    JOIN paket_wisata p ON bd.paketwisata_id = p.id
    WHERE bd.deleted_at IS NULL;
    `
    koneksi.query(q, callback);
};

const selectBDById = (id, callback) => {
    const q = `
    SELECT 
    bd.id, 
    DATE_FORMAT(b.tgl_pemesanan, '%d %M %Y') AS tgl_pemesanan,
    m.nama AS nama_member, 
    p.namapaket, 
    bd.jumlah_orang, 
    bd.harga, 
    bd.total, 
    bd.status_pembayaran,
    bd.file, 
    bd.created_at
    FROM booking_detail bd
    JOIN booking b ON bd.booking_id = b.id
    JOIN members m ON b.members_id = m.id
    JOIN paket_wisata p ON bd.paketwisata_id = p.id
    WHERE bd.deleted_at IS NULL 
    AND bd.id = ?;
    `
    koneksi.query(q,[id], callback);
};

const insertBD = (booking_id, paketwisata_id, jumlah_orang, status_pembayaran, file, callback) => {
    const harga = 'SELECT harga FROM paket_wisata WHERE id = ?'

    koneksi.query(harga, [paketwisata_id], (err, results) => {
        const harga = results[0].harga
        const admin = 2500
        const total = (jumlah_orang * harga) + admin

        const q = `
            INSERT INTO booking_detail (booking_id, paketwisata_id, jumlah_orang, harga, total, status_pembayaran, file) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`

        koneksi.query(q, [booking_id, paketwisata_id, jumlah_orang, harga, total, status_pembayaran, file], callback)
    })
}

const updateBooking = (id, status_pembayaran, callback) => {
    const q = `
        UPDATE booking_detail
        SET status_pembayaran = ?
        WHERE id = ?`;

    koneksi.query(q, [status_pembayaran, id], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return callback(err);
        }
        if (result.affectedRows === 0) {
            return callback(new Error("Booking not found"));
        }

        callback(null, result);
    });
};


const deleteBD = (id, callback) => {
    const q = "UPDATE booking_detail SET deleted_at = NOW() WHERE id=?";
    koneksi.query(q, [id], callback);
};

module.exports = {
    selectBD,
    selectBDById,
    updateBooking,
    insertBD,
    deleteBD
};
