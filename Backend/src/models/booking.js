const koneksi = require("./db")

const selectBooking = (callback) => {
    const q = "SELECT  * FROM booking WHERE deleted_at IS NULL"
    koneksi.query(q, callback)
}

const selectBookingById = (id, callback) => {
    const q = "SELECT * FROM booking WHERE id = ? AND deleted_at IS NULL";
    koneksi.query(q, [id], callback);
};


const selectBookingByMid = (members_id, callback) => {
    const q = "SELECT * FROM booking WHERE members_id = ? AND deleted_at IS NULL"
    koneksi.query(q, [members_id], callback)
}

const insertBooking = (tgl_pemesanan,members_id, callback) => {
    const q = "INSERT INTO booking(tgl_pemesanan, members_id) VALUES (?,?)"
    koneksi.query(q, [tgl_pemesanan, members_id], callback)
}


const deleteBooking = (id, callback) => {
    const q = "UPDATE booking SET deleted_at = now() WHERE id=?"
    koneksi.query(q, [id], callback)
}

module.exports = {
    selectBooking,
    selectBookingById,
    selectBookingByMid,
    insertBooking,
    deleteBooking
}