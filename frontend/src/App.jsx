import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useState, useEffect } from "react"
import Layout from "./layouts/Layout"
import Dashboard from "./pages/admin/Dashboard.jsx"
import AuthLayout from "./layouts/AuthLayout.jsx"
import Login from "./pages/auth/Login.jsx"
import AddKendaraan from "./pages/admin/AddKendaraan.jsx"
import AddPaketWisata from "./pages/admin/AddPaketWisata.jsx"
import AddUser from "./pages/admin/AddUser.jsx"
import EditKendaraan from "./pages/admin/EditKendaraan.jsx"
import EditPaketWisata from "./pages/admin/EditPaketWisata.jsx"
import EditRentals from "./pages/admin/EditRentals.jsx"
import Booking from "./pages/admin/Booking.jsx"
import Users from "./pages/admin/Users.jsx"
import Members from "./pages/admin/Members.jsx"
import PaketWisata from "./pages/admin/PaketWisata.jsx"
import Kendaraan from "./pages/admin/Kendaraan.jsx"
import Rentals from "./pages/admin/Rentals.jsx"
import LoginClient from "./pages/auth/LoginClient.jsx"
import Register from "./pages/auth/Register.jsx"
import Home from "./pages/client/home.jsx"
import Rentalss from "./pages/client/Rentals.jsx"
import Rentals2 from "./pages/client/Rentals2.jsx"
import Contact from "./pages/client/Contact.jsx"
import Pinjam from "./pages/client/Pinjam.jsx"
import Pesan from "./pages/client/Pesan.jsx"
import ETicket from "./pages/client/ETicket.jsx"
import Cart from "./pages/client/cart.jsx"
import PD from "./pages/client/PesanDetail.jsx"
import EM from "./pages/auth/EditMember.jsx"
import GM from "./pages/auth/GetMember.jsx"
import EP from "./pages/client/EditProfile.jsx"

function App() {
  let isLoggedIn = false;
const token = localStorage.getItem('token');
if (token !== null) {
  isLoggedIn = true;
} 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/admin/' element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="addkendaraan" element={<AddKendaraan />} />
            <Route path="adduser" element={<AddUser />} />
            <Route path="addpaketwisata" element={<AddPaketWisata />} />
            <Route path="booking" element={<Booking />} />
            <Route path="users" element={<Users />} />
            <Route path="members" element={<Members />} />
            <Route path="paketwisata" element={<PaketWisata />} />
            <Route path="kendaraan" element={<Kendaraan />} />
            <Route path="rentals" element={<Rentals />} />
            <Route path="paketwisata/:id" element={<EditPaketWisata />} />
            <Route path="kendaraan/:id" element={<EditKendaraan />} />
            <Route path="rentals/:id" element={<EditRentals />} />
          </Route>
          <Route path="/" element={<AuthLayout />} >
            <Route path="/" element={<Login />} />
          </Route>
          <Route path="/">
          <Route path="/login" element={<LoginClient />} />
          <Route path="/getM" element={<GM />} />
          <Route path="/edit/:id" element={<EM />} />
          <Route path="/sign" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/rental" element={<Rentalss />} />
          <Route path="/rentalBis" element={<Rentals2 />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cetak/:bd_id" element={<ETicket />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/edit-profile" element={<EP />} />
          <Route path="/pesan-detail" element={<PD />} />
          <Route path="/pesan/:id" element={isLoggedIn ? <Pesan /> : <LoginClient />} />
        <Route path="/pinjam/:id" element={isLoggedIn ? <Pinjam /> : <LoginClient />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
