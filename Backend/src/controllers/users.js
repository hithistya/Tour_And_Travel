const User = require("../models/users")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const index = (req, res) => {
    User.selectUsers((err, result) => {
        if (err) {
            return res.status(500).json({error:message})
        }
        if(result.length === 0){
            return res.status(404).json({message: "User kosong"})
        }
        res.status(200).json(result)
    })
}

const showUser = (req, res) => {
    const {id} = req.params
    User.selectUserById(id, (err,result) => {
        if(err) {
            return res.status(500).json({error: err.message})
        }
        if(result.length === 0) {
            return res.status(400).json({message: "user ndak ada"})
        }
        res.status(200).json(result[0])
    })
}

const storeUser = (req, res) => {
    const {nama, email, password} = req.body
    User.insertUsers(nama, email, password, (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message})
        }
        res.status(200).json({message: "simpan behasil", userId: result.insertId})
    })
}

const updateUser = (req, res) => {
    const { id } = req.params;
    const { nama, email, password } = req.body;
    User.updateUsers(id, nama, email, password, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(200).json("data berhasil di ubah");
    })
}

const destroyUser = (req, res) => {
    const {id} = req.params
    User.deleteUser(id, (err, result) => {
        if(err) {
            return res.status(500).json({error: err.message})
        }
        res.status(200).json("Data Berhasil di hapus")
    })
}

const login = (req,res) => {
    const {email, password} = req.body
    User.selectUsersByEmail(email, (err, result) => {
        if (err) {
            return res.status(500).json({message: err.message})
        } 
        if (result.length === 0) {
            return res.status(400).json({message: "User ga ada cuy"})
        }
        const user = result[0]
        const passwordIsValid = bcrypt.compareSync(password, user.password)
        if (!passwordIsValid) {
            return res.status(401).json({message: "password salah"})
        }
        const token = jwt.sign({id: user.id}, "rahasia", {expiresIn : 86400})
        res.status(200).json({auth: true,token, userId: user.id,})
    })
}

const logout = (req, res) => {
    res.status(200).json({ auth:false, token: null });
}

module.exports = {
    index,
    showUser,
    storeUser,
    updateUser,
    destroyUser,
    login,
    logout
}