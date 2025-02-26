const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const migration = require("./migrations/migration")
const Routes = require("./routes/routes")
const path = require('path');


const app = express()
const port = 3000
app.use(cors())
app.use('/kendaraan', express.static(path.join(__dirname, 'files/kendaraan')))
app.use('/paketwisata', express.static(path.join(__dirname, 'files/paketwisata')))
app.use('/pembayaran', express.static(path.join(__dirname, 'files/pembayaran')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/api", Routes)
migration()

app.listen(port, () => {
    console.log(`apliakasi jalan di port ${port}`)
})