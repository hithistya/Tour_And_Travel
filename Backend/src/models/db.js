const mysql = require("mysql2")
const koneksi = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_tour_and_travel",
})

koneksi.connect((err) => {
    if (err) {
        console.error("error koneksi ke database", err.stack)
        return
    }
    console.log("berhasil konek ke database")
})

module.exports = koneksi