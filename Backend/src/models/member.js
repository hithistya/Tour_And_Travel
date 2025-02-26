const koneksi = require("./db")
const bcrypt = require("bcryptjs")

const selectMembers = (callback) => {
    const q = "SELECT * FROM members"
    koneksi.query(q, callback)
}

const selectMembersById = (id, callback) => {
    const q = "SELECT * FROM members WHERE id=?"
    koneksi.query(q, [id] ,callback)
}

const insertMembers = (nama, no_hp, email, password, callback) => {
    if (password) {
        const hashedPass = bcrypt.hashSync(password, 10)
        const q = "INSERT INTO members(nama, no_hp, email, password) VALUES (?,?,?,?)"
        koneksi.query(q,[nama, no_hp, email, hashedPass], callback) 
    } else {
        console.error("Password harus di isi")
    }
}

const updateMembers = (id, nama, no_hp, email, password, callback) => {
    if (password) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const q = "update members set nama=?, no_hp=?, email=?, password=? where id=?"
      koneksi.query(q, [nama, no_hp, email, hashedPassword, id], callback)
    } else {
      const q = "UPDATE members set nama=?, no_hp=?, email=? where id=?"
      koneksi.query(q, [nama, no_hp, email, id], callback)
    }
}

const updatePassword = (id, password, callback) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
      const q = "update members set password=? where id=?"
      koneksi.query(q, [hashedPassword, id], callback)
}

const deleteMembers = (id, callback) => {
    const q = "UPDATE members SET deleted_at = NOW() WHERE id=?"
    koneksi.query(q, [id], callback)
}

const selectMembersByEmail = (email, callback) => {
    const q = "SELECT * FROM members WHERE email=? AND deleted_at IS NULL"
    koneksi.query(q, [email], callback)
}

module.exports = {
    selectMembers,
    selectMembersById,
    updatePassword,
    insertMembers,
    updateMembers,
    deleteMembers,
    selectMembersByEmail
}