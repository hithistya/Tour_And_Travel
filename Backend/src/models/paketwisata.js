const koneksi = require("./db")

const selectPaket = (callback) => {
    const q = "SELECT * FROM paket_wisata WHERE deleted_at IS NULL"
    koneksi.query(q, callback)
}

const selectPaketById = (id, callback) => {
    if (id) {
        const q = "SELECT * FROM paket_wisata WHERE id = ?"
        koneksi.query(q, [id], callback)
    } else {
        console.log("id tidak ditemukan")
    }
} 

const insertPaket = (namapaket, deskripsi, lokasi_wisata, harga, foto, callback) => {
    const q = "INSERT INTO paket_wisata(namapaket, deskripsi, lokasi_wisata, harga, foto) VALUES(?,?,?,?,?)";
    koneksi.query(q, [namapaket, deskripsi, lokasi_wisata, harga, foto], callback);
}

const updatePaket = (id, namapaket, deskripsi, lokasi_wisata, harga, foto, callback) => {
    if (foto) {
        const q = "UPDATE paket_wisata SET namapaket=?, deskripsi=?, lokasi_wisata=?, harga=?, foto=? WHERE id=?";
        console.log("Query:", q);
        console.log("Parameters:", [namapaket, deskripsi, lokasi_wisata, harga, foto, id]);
        koneksi.query(q, [namapaket, deskripsi, lokasi_wisata, harga, foto, id], callback);
    } else {
        const q = "UPDATE paket_wisata SET namapaket=?, deskripsi=?, lokasi_wisata=?, harga=? WHERE id=?";
        console.log("Query:", q);
        console.log("Parameters:", [namapaket, deskripsi, lokasi_wisata, harga, id]);
        koneksi.query(q, [namapaket, deskripsi, lokasi_wisata, harga, id], callback);
    }
};

const deletePaket = (id, callback) => {
    const q = "UPDATE paket_wisata SET deleted_at = NOW() WHERE id = ?"
    koneksi.query(q, [id], callback)
}

module.exports = {
    selectPaket,
    selectPaketById,
    insertPaket,
    updatePaket,
    deletePaket
}