const kendaraan = require("../models/kendaraan")
const multer = require('multer');
const path = require('path');

const index = (req, res) => {
    kendaraan.selectK((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Data Kosong" });
        }
        res.status(200).json(result);
    });
};

const showKendaraan = (req, res) => {
    const { id } = req.params;
    kendaraan.selectKById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }
        res.status(200).json(result[0]);
    });
};

const showKendaraanMobil = (req, res) => {
    kendaraan.selectKMobil((err, result) => {
        if (err) {
            console.error('Error:', err);  
            return res.status(500).json({ error: err.message });
        }
        
        console.log('Result from database:', result);  
        
        if (result.length === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }
        
        res.status(200).json(result);
    });
};



const showKendaraanBis = (req, res) => {
    kendaraan.selectKBis((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }
        res.status(200).json(result);
    });
};
const showKendaraanTravel = (req, res) => {
    kendaraan.selectKTravel((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }
        res.status(200).json(result);
    });
};


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/files/kendaraan/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
const storeKendaraan = (req, res) => {
    const { merk, jenis_kendaraan, plat_no, kapasitas, harga, status_kendaraan } = req.body;
    kendaraan.insertK(merk, jenis_kendaraan, plat_no, kapasitas, harga, status_kendaraan, req.file.filename, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(201).json({message:"Kendaraan berhasil ditambahkan", id: result.insertId});
    });
};

const updateS = (req, res) => {
    const { id } = req.params
    const { status_kendaraan } = req.body;

    kendaraan.updateS(id, status_kendaraan, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: "Status kendaraan berhasil diperbarui" });
    });
};


const editKendaraan = (req, res) => {
    const {id} = req.params
    const {merk, jenis_kendaraan, plat_no, kapasitas, harga, status_kendaraan} = req.body
        let foto = ""
        if (req.file) {
            foto = req.file.filename
        } else {
            foto = null
        }
        kendaraan.updateK(id, merk, jenis_kendaraan, plat_no, kapasitas, harga, status_kendaraan, foto, (err, result) => {
            if (err) {
                return res.status(500).json({message: err.message})
            }
            res.status(200).json("Update Berhasil")
        })
}

const destroyKendaraan = (req, res) => {
    const { id } = req.params;
    kendaraan.deleteK(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json("Hapus Kendaraan berhasil");
    });
};

module.exports = {
    index,
    showKendaraan,
    showKendaraanBis,
    showKendaraanMobil,
    showKendaraanTravel,
    storeKendaraan,
    updateS,
    upload,
    editKendaraan,
    destroyKendaraan
};
