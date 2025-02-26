const express = require("express")
const router = express.Router()
const userController = require("../controllers/users")
const memberController = require("../controllers/members")
const paketController = require("../controllers/paketwisataControllers")
const bookingController = require("../controllers/bookingControllers")
const bookingDetailController = require("../controllers/bookingDetailControllers")
const kendaraanController = require("../controllers/kendaraanController")
const rentals = require("../controllers/rentalsController")
const authJwt = require("../middleware/authMiddleware")

// user route
router.get("/users",  authJwt,userController.index)
router.get("/users/:id",  authJwt,userController.showUser)
router.post("/users", authJwt,userController.storeUser)
router.put("/users/:id", authJwt,userController.updateUser)
router.delete("/users/:id",  authJwt,userController.destroyUser)
router.post("/login", userController.login)
router.post("/logout", authJwt,userController.logout)

// members route
router.get("/members", memberController.index)
router.post("/members", memberController.getEmail)
router.get("/member/:id", authJwt,memberController.showMembers)
router.post("/member",  memberController.storeMembers)
router.put("/member/:id",  memberController.updateMembers)
router.put("/members/:id",  memberController.updatePassword)
router.delete("/member/:id",  authJwt,memberController.destroyMembers)
router.post("/member/login", memberController.login)
router.post("/member/logout",  authJwt,memberController.logout)


// paketwisata route
router.get("/paket", paketController.index)
router.get("/paket/:id", paketController.showPaket)
router.post("/paket", authJwt, paketController.upload.single('foto'), paketController.storePaket)
router.put("/paket/:id", authJwt,paketController.upload.single('foto'), paketController.editPaket)
router.delete("/paket/:id", authJwt,paketController.destroyPaket)


// booking route
router.get("/booking", authJwt,bookingController.index)
// router.get("/booking/:id", bookingController.showBooking)
router.get("/booking/:members_id", authJwt,bookingController.showBookingByMid)
router.post("/booking", authJwt,bookingController.storeBooking)
router.delete("/booking/:id", authJwt,bookingController.destroyBooking)

//Booking Detail
router.get("/bd", authJwt,bookingDetailController.index)
router.get("/bd/:id", bookingDetailController.showBD)
router.put("/bd/:id", bookingDetailController.updateBooking)
router.post("/bd", authJwt,bookingDetailController.upload.single('file'),bookingDetailController.storeBd)
router.delete("/bd/:id", authJwt,bookingDetailController.destroyBd)

// kendaraan 

router.get("/kendaraan", kendaraanController.index)
router.get("/kendaraan/:id", kendaraanController.showKendaraan)
router.get("/kendaraan/mobil", kendaraanController.showKendaraanMobil)
router.get("/kendaraan/bis", kendaraanController.showKendaraanBis)
router.get("/kendaraan/travel", kendaraanController.showKendaraanTravel)
router.post("/kendaraan", authJwt,kendaraanController.upload.single('foto'), kendaraanController.storeKendaraan)
router.put("/status/:id", authJwt,kendaraanController.updateS)
router.put("/kendaraan/:id", authJwt,kendaraanController.upload.single('foto'), kendaraanController.editKendaraan)
router.delete("/kendaraan/:id", authJwt,kendaraanController.destroyKendaraan)

// rentals
router.get("/rentals", authJwt,rentals.index)
router.get("/rentals/:id", authJwt,rentals.showRentals)
router.post("/rentals", authJwt,rentals.upload.single('file'),rentals.storeRental)
router.put("/rentals/:id", authJwt,rentals.upload.single('file'),rentals.updateRental)
router.put("/rentals/:id", rentals.updateRental2)
router.delete("/rentals/:id", authJwt,rentals.destroyRental)

module.exports = router