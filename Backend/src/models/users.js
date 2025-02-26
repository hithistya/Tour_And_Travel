const koneksi = require("./db")
const bcrypt = require("bcryptjs")

const selectUsers = (callback) => {
    const q = "SELECT * FROM users"
    koneksi.query(q, callback)
}

const selectUserById = (id,callback) => {
    const q = "SELECT * FROM users WHERE id=?"
    koneksi.query(q, [id] ,callback)
}

const insertUsers = (nama, email, password, callback) => {
    if(password) {
        const hashedPass = bcrypt.hashSync(password, 10)
        const q = "INSERT INTO users(nama, email, password) VALUES (?,?,?)"
        koneksi.query(q, [nama,email, hashedPass], callback)
    } else {
        console.error("Pasword harus di isi!!!")
    }
}

const updateUsers = (id, nama, email, password, callback) => {
    console.log(password);
  
    if (password) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const q = "update users set nama=?,email=?, password=? where id=?"
      koneksi.query(q, [nama, email, hashedPassword, id], callback)
    } else {
      const q = "UPDATE users set nama=?, email=? where id=?"
      koneksi.query(q, [nama, email, id], callback)
    }
  }

const deleteUser = (id, callback) => {
    if (id) {
        const q = "DELETE FROM users where id=?"
        koneksi.query(q, [id], callback)
    } else {
        console.log("ilegal Akses")
    }
}

const selectUsersByEmail = (email, callback) => {
    if (email) {
        const q = "SELECT * FROM users WHERE email=?"
        koneksi.query(q, [email], callback)
    } else {
        console.log("email nya ga ada say!!")
    }
}
module.exports = {
    selectUsers,
    selectUserById,
    insertUsers,
    updateUsers,
    deleteUser,
    selectUsersByEmail
}