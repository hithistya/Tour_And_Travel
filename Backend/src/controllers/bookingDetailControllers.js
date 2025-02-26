const Bd = require("../models/bookingDetail")
const multer = require('multer');
const path = require('path');

const index = (req, res) => {
    Bd.selectBD((err, result) => {
        if (err) {
            return res.status(500).json({error: err.message})
        }
        if (result.length === 0) {
            return res.status(404).json({message: "kosong"})
        }
        res.status(202).json(result)
    })
}

const showBD = (req, res) => {
    const { id } = req.params;
    Bd.selectBDById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }
        res.status(200).json(result[0]);
    });
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/files/pembayaran/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage })

const storeBd = (req, res) => {
    const { booking_id, paketwisata_id, jumlah_orang, status_pembayaran } = req.body;
      
    if (!booking_id || !paketwisata_id || !jumlah_orang) {
        return res.status(400).json({ error: "Semua data harus diisi" });
    }

    Bd.insertBD(booking_id, paketwisata_id, jumlah_orang, status_pembayaran, req.file.filename,  (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Booking detail berhasil ditambahkan", id: result.insertId, data: result });
    });
};



const updateBooking = (req, res) => {
    const { id } = req.params;  
    const { status_pembayaran } = req.body;  
    
    Bd.updateBooking(id, status_pembayaran, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Booking not found or no changes made." });
        }

        res.status(200).json({ message: "Booking successfully updated", data: result });
    });
};

module.exports = { updateBooking };



const destroyBd = (req, res) => {
    const {id} = req.params
    Bd.deleteBD(id, (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message})
        }
        res.status(202).json({message: "Berhasil Menghapus"})
    })
}


module.exports = {
    index,
    storeBd,
    showBD,
    updateBooking,
    upload,
    destroyBd
}