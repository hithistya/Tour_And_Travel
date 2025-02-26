const booking = require('../models/booking')

const index = (req, res) => {
    booking.selectBooking((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "data kosong" })
        }
        res.status(200).json(result)
    })
}

// const showBooking = (req, res) => {
//     const {id} = req.params
//     booking.selectBooking(id, (err, result) => {
//         if (err) {
//             return res.status(500).json({error: err.message})
//         }
//         if (result.length === 0) {
//             return res.status(404).json({message: "kosong"})
//         }
//         res.status(202).json(result[0])
//     })
// }

const showBookingByMid = (req, res) => {
    const { members_id } = req.params
    booking.selectBookingByMid(members_id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "kosong" })
        }
        res.status(200).json(result)
    })
}

const storeBooking = (req, res) => {
    const { tgl_pemesanan, members_id } = req.body
    booking.insertBooking(tgl_pemesanan, members_id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(202).json({ message: "Data Berhasil Ditambahkan", id: result.insertId })
    })
}

const destroyBooking = (req, res) => {
    const { id } = req.params
    booking.deleteBooking(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(202).json({ message: "Data Berhasil dihapus" })
    })
}

module.exports = {
    index,
    // showBooking,
    showBookingByMid,
    storeBooking,
    destroyBooking
}