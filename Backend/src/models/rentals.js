const koneksi = require("./db");

const selectRentals = (callback) => {
    const q = `SELECT 
    r.id,
    k.merk,
    m.nama AS nama_member,
    r.tgl_sewa,
    r.tgl_kembali,
    r.harga,
    r.status_pembayaran,
    r.status_sewa,
    r.file,
    r.created_at
    FROM rentals r
    JOIN kendaraan k ON r.kendaraan_id = k.id
    JOIN members m ON r.members_id = m.id
    WHERE r.deleted_at IS NULL;`
    koneksi.query(q, callback)
}

const selectRentalsById = (id, callback) => {
    const q = "SELECT * FROM rentals WHERE id = ? AND deleted_at IS NULL"
    koneksi.query(q, [id], callback)
}

const selectRentalsByMember = (members_id, callback) => {
    const query = "SELECT * FROM rentals WHERE members_id = ?"

    koneksi.query(query, [members_id], callback)
};


const insertRental = (kendaraan_id, members_id, tgl_sewa, tgl_kembali, status_pembayaran, status_sewa, file, callback) => {
    const hargaQuery = "SELECT harga FROM kendaraan WHERE id = ?";

    koneksi.query(hargaQuery, [kendaraan_id], (err, results) => {
        if (err) {
            return callback(err, null); 
        }

        if (results.length === 0) {
            return callback(new Error("Vehicle not found"), null);
        }

        const hargaS = results[0].harga;

        const tglSewa = new Date(tgl_sewa);
        const tglKembali = new Date(tgl_kembali);

        if (tglKembali < tglSewa) {
            return callback(new Error("Tanggal kembali tidak boleh lebih awal dari tanggal sewa"), null);
        }

        const selisihHari = Math.ceil((tglKembali - tglSewa) / (1000 * 3600 * 24));
        const totalHari = selisihHari > 0 ? selisihHari : 1; 

        const Harga = hargaS * totalHari;

        console.log("Data yang diterima:", {
            kendaraan_id,
            members_id,
            tgl_sewa,
            tgl_kembali,
            Harga,
            status_pembayaran,
            status_sewa,
            file
        });

        const q = `
            INSERT INTO rentals (kendaraan_id, members_id, tgl_sewa, tgl_kembali, harga, status_pembayaran, status_sewa, file) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        koneksi.query(q, [kendaraan_id, members_id, tgl_sewa, tgl_kembali, Harga, status_pembayaran, status_sewa, file], callback);
    });
};

const updateRental = (rental_id, status_pembayaran, status_sewa, callback) => {
    const q = `
        UPDATE rentals 
        SET status_pembayaran = ?, status_sewa = ?
        WHERE id = ?`;
    koneksi.query(q, [status_pembayaran, status_sewa, rental_id], callback);
}

const updateRental2 = (rental_id, status_sewa, callback) => {
    const q = `
        UPDATE rentals 
        SET status_sewa = ?
        WHERE id = ?`;
    koneksi.query(q, [status_sewa, rental_id], callback);
}
   

const deleteRental = (id, callback) => {
    const q = "UPDATE rentals SET deleted_at = NOW() WHERE id=?"
    koneksi.query(q, [id], callback);
}

module.exports = {
    selectRentals,
    selectRentalsById,
    selectRentalsByMember,
    insertRental,
    updateRental,
    updateRental2,
    deleteRental
};
