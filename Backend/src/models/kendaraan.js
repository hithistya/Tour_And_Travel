const koneksi = require("./db")

const selectK = (callback) =>{
    const q = "SELECT * FROM kendaraan WHERE deleted_at is NULL"
    koneksi.query(q, callback)
}

const selectKById = (id, callback) => {
    const q = "SELECT * FROM kendaraan WHERE id=?"
    koneksi.query(q, [id], callback)
}

const selectKMobil = (callback) => {
    const q = "SELECT * FROM kendaraan WHERE jenis_kendaraan = 'mobil' AND deleted_at IS NULL";
    console.log('Executing query:', q);  
    koneksi.query(q, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);  
            return callback(err, null);
        }
        console.log('Query result:', result);  
        callback(null, result);
    });
};


const selectKTravel = (callback) => {
    const q = "SELECT * FROM kendaraan WHERE jenis_kendaraan = 'travel' AND deleted_at IS NULL";
    koneksi.query(q, callback);
}

const selectKBis = (callback) => {
    const q = "SELECT * FROM kendaraan WHERE jenis_kendaraan = 'bis' AND deleted_at IS NULL";
    koneksi.query(q, callback);
}

const insertK = (merk, jenis_kendaraan, plat_no, kapasitas, harga, status_kendaraan, foto, callback) => {
    const q = "INSERT INTO kendaraan (merk, jenis_kendaraan, plat_no, kapasitas, harga, status_kendaraan, foto) VALUES (?,?,?,?,?,?,?)";
    koneksi.query(q, [merk, jenis_kendaraan, plat_no, kapasitas, harga, status_kendaraan, foto], callback);
};

const updateS = (id, status_kendaraan, callback) => {
    const q = "UPDATE kendaraan SET status_kendaraan = ? WHERE id = ? AND deleted_at IS NULL";
    koneksi.query(q, [status_kendaraan, id], callback);
};

const updateK = (id, merk, jenis_kendaraan, plat_no, kapasitas, harga, status_kendaraan, foto, callback) => {
    if (foto) {
        const q = "UPDATE kendaraan SET merk = ?, jenis_kendaraan = ?, plat_no = ?, kapasitas = ?, harga = ?, status_kendaraan = ?, foto = ? WHERE id = ? AND deleted_at IS NULL";
        koneksi.query(q, [merk, jenis_kendaraan, plat_no, kapasitas, harga, status_kendaraan, foto, id], callback);
    } else {
        const q = "UPDATE kendaraan SET merk = ?, jenis_kendaraan = ?, plat_no = ?, kapasitas = ?, harga = ?, status_kendaraan = ? WHERE id = ? AND deleted_at IS NULL";
    koneksi.query(q, [merk, jenis_kendaraan, plat_no, kapasitas, harga, status_kendaraan, id], callback);
    }
};

const deleteK = (id, callback) => {
    const q = "UPDATE kendaraan SET deleted_at = NOW() WHERE id = ?";
    koneksi.query(q, [id], callback);
};


module.exports = {
    selectK,
    selectKById,
    selectKMobil,
    selectKBis,
    selectKTravel,
    insertK,
    updateS,
    updateK,
    deleteK
}