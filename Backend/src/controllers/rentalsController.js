const Rentals = require("../models/rentals")
const multer = require('multer')
const path = require('path')


const index = (req, res) => {
    Rentals.selectRentals((err, result) => {
        if (err) {
            return res.status(500).json({error: err.message})
        }
        if (result.length === 0) {
            return res.status(404).json({message: "No rentals found"})
        }
        res.status(202).json(result)
    })
}

const showRentals = (req, res) => {
        const {id} = req.params
        Rentals.selectRentalsById(id, (err, result) => {
            if (err) {
                return res.status(500).json({error: err.message})
            }
            if (result.length === 0) {
                return res.status(404).json({message: "kosong"})
            }
            res.status(202).json(result[0])
        })
    }


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/files/pembayaran/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })
const storeRental = (req, res) => {
    const { kendaraan_id, members_id, tgl_sewa, tgl_kembali, status_pembayaran, status_sewa } = req.body;

    
    if (!kendaraan_id || !members_id || !tgl_sewa || !tgl_kembali || !status_pembayaran || !status_sewa) {
        return res.status(400).json({ error: "All fields are required" });
    }

    Rentals.insertRental(kendaraan_id, members_id, tgl_sewa, tgl_kembali, status_pembayaran, status_sewa, req.file ? req.file.filename : null, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Rental successfully added", data: result });
    });
};

const destroyRental = (req, res) => {
    const { id } = req.params;
    
    Rentals.deleteRental(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Rental not found" });
        }
        res.status(202).json({ message: "Rental successfully deleted" });
    });
};


const updateRental = (req, res) => {
    const {id} = req.params
    const { status_pembayaran, status_sewa} = req.body;
    Rentals.updateRental(id, status_pembayaran, status_sewa,  (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: "Rental successfully updated", data: result });
    });
};

const updateRental2 = (req, res) => {
    const {id} = req.params
    const {status_sewa} = req.body;
    Rentals.updateRental2(id, status_sewa,  (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: "Rental successfully updated", data: result });
    });
};

module.exports = {
    index,
    storeRental,
    showRentals,
    upload,
    destroyRental,
    updateRental,
    updateRental2
};
