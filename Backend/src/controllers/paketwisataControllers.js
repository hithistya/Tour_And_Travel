const { error } = require('console')
const paket = require('../models/paketwisata')
const multer = require('multer')
const path = require('path')

const index = (req, res) => {
    paket.selectPaket((err, result) => {
        if (err) {
            return res.status(500).json({error: err.message})
        }
        if (result.length === 0) {
            return res.status(404).json({message: "Data Kosong"})
        }
        res.status(200).json(result)
    })
}

const showPaket = (req, res) => {
    const { id } = req.params
    paket.selectPaketById(id, (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message})
        }
        if (result.length === 0) {
            return res.status(404).json({message: "data tidak ditemukan"})
        }
        res.status(202).json(result[0])
    })
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/files/paketwisata/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage: storage})
const storePaket  = (req, res) => {
    const {namapaket, deskripsi, lokasi_wisata, harga} = req.body
    if(!req.file) {
        return res.status(500).json("Foto tidak boleh kosong")
    }
    paket.insertPaket(namapaket, deskripsi, lokasi_wisata, harga, req.file.filename, (err, result) => {
        if (err) {
            return res.status(500).json({message: err.message})
        }
        res.status(202).json("upload Berhasil")
    })
}

const editPaket = (req, res) => {
    const {id} = req.params
    const {namapaket, deskripsi, lokasi_wisata, harga} = req.body
    let foto = ""
    if (req.file) {
        foto = req.file.filename
    } else {
        foto = null
    }
    paket.updatePaket(id, namapaket, deskripsi, lokasi_wisata, harga, foto, (err, result) => {
        if (err) {
            return res.status(500).json({message: err.message})
        }
        res.status(200).json("Update Berhasil")
    })
}

const destroyPaket = (req, res) => {
    const {id} = req.params
    paket.deletePaket(id, (err, result) => {
        if (err) {
            return res.status(500).json({message: err.message})
        }
        res.status(200).json("Hapus Data berhasil")
    })
}

module.exports = {
    index,
    showPaket,
    storePaket,
    upload,
    editPaket,
    destroyPaket
}