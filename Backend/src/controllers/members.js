const members = require("../models/member")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const index = (req, res) => {
    members.selectMembers((err, result) => {
        if (err) {
            return res.status(500).json({ error: message })
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "member kosong" })
        }
        res.status(200).json(result)
    })
}

const showMembers = (req, res) => {
    const { id } = req.params
    members.selectMembersById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: message })
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "member tidak ada" })
        }
        res.status(200).json(result[0])
    })
}

const storeMembers = (req, res) => {
    const { nama, no_hp, email, password } = req.body
    members.insertMembers(nama, no_hp, email, password, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(200).json({ message: "Simpan berhasil", memberId: result.insertId })
    })
}

const updateMembers = (req, res) => {
    const { id } = req.params
    const { nama, no_hp, email, password } = req.body
    members.updateMembers(id, nama, no_hp, email, password, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(200).json({ message: "Data berhasil di ubah" })
    })
}

const updatePassword = (req, res) => {
    const { id } = req.params
    const { password } = req.body
    members.updatePassword(id, password, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(200).json({ message: "Data berhasil di ubah" })
    })
}

const destroyMembers = (req, res) => {
    const { id } = req.params
    members.deleteMembers(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(200).json({ message: "Data berhasil di hapus" })
    })
}

const login = (req, res) => {
    const { email, password } = req.body
    members.selectMembersByEmail(email, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "member ndak ada" })
        }
        const member = result[0]
        const passwordIsValid = bcrypt.compareSync(password, member.password)
        if (!passwordIsValid) {
            return res.status(401).json({ message: "password salah" })
        }
        const token = jwt.sign({ id: member.id }, "rahasia", { expiresIn: 86400 })


        res.status(200).json({ auth: true, token, member })
    })
}

const getEmail = (req, res) => {
    const { email } = req.body; 
    members.selectMembersByEmail(email, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Member not found" });
        }
        const member = result[0]; 
        res.status(200).json({ id: member.id });
    });
};



const logout = (req, res) => {
    return res.status(200).json({ auth: false, token: null })
}

module.exports = {
    index,
    showMembers,
    updatePassword,
    storeMembers,
    getEmail,
    updateMembers,
    destroyMembers,
    login,
    logout
}