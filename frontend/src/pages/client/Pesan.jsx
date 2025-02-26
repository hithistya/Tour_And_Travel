import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashLink as Link } from "react-router-hash-link";
import Swal from 'sweetalert2';

const Pesan = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [namapaket, setPaket] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [foto, setFoto] = useState('');
  const [harga, setHarga] = useState(0);
  const [jumlah, setJumlah] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const Id = localStorage.getItem("id");

    if (token && Id) {
      setIsLoggedIn(true);
      getPaket(token);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
  
    if (!token) {
      Swal.fire({
        icon: "error",
        text: "Anda harus login terlebih dahulu!",
      });
      return;
    }
  
    const formData = new FormData(event.target);
    const file = formData.get("bukti_pembayaran");
    const status_pembayaran = file.name ? "Pandding" : "Belum Dibayar";
  
    const bookingData = {
      members_id: localStorage.getItem("id"),
      tgl_pemesanan: new Date().toISOString().split("T")[0],
    };
  
    try {
      const bookingResponse = await fetch("http://localhost:3000/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });
  
      if (!bookingResponse.ok) throw new Error("Gagal menyimpan data booking");
  
      const bookingResult = await bookingResponse.json();
      const booking_id = bookingResult.id;
  
      const bdFormData = new FormData();
      bdFormData.append("booking_id", booking_id);
      bdFormData.append("paketwisata_id", id);
      bdFormData.append("jumlah_orang", jumlah);
      bdFormData.append("harga", harga);
      bdFormData.append("total", totalHarga);
      bdFormData.append("status_pembayaran", status_pembayaran);
      if (file.name) bdFormData.append("file", file);
  
      const bdResponse = await fetch("http://localhost:3000/api/bd", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: bdFormData,
      });
  
      if (!bdResponse.ok) throw new Error("Gagal menyimpan data BD");
  
      const bd = await bdResponse.json();
      console.log("BD Response:", bd);
      const bd_id = bd.id; 
  
      Swal.fire({
        icon: "success",
        text: "Pemesanan Berhasil",
        timer: 1000,
      }).then(() => {
        window.location.href = `/cetak/${bd_id}`;
      });
  
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({ icon: "error", text: error.message || "Terjadi kesalahan" });
    }
  };
  


  const totalHarga = (jumlah || 0) * (harga || 0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    if (id) {
      getPaket(token);
    }
  }, [id]);

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false)
    window.location.href = "/home";
  }

  const getPaket = async (token) => {
    try {
      const response = await fetch(`http://localhost:3000/api/paket/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      setPaket(data.namapaket);
      setDeskripsi(data.deskripsi);
      setLokasi(data.lokasi_wisata);
      setHarga(data.harga);
      setFoto(data.foto);
    } catch (error) {
      console.error("Gagal mengambil data paket:", error);
    }
  };

  return (
    <div>
      <header>
        <Link to="/" className="brand">Tour &amp; Travel</Link>
        <div className="menu-btn" onClick={() => setIsActive(!isActive)} />
        <div className={`navigation ${isActive ? 'active' : ''}`}>
          <div className="navigation-items">
            <Link to="/home">Home</Link>
            <Link to="/home#about_us" smooth>About Us</Link>
            <Link to="/home#paket_wisata" smooth>Paket Wisata</Link>
            <Link className="dropdown " style={{ textDecoration: 'none' }}>
              <Link
                className="btn ii p-0 ml-0 sm-p-0 lg-p-0"
                onClick={() => setIsOpen(!isOpen)}
                style={{ fontWeight: '500' }}
              >
                Rentals
              </Link>

              {isOpen && (
                <div className="dropdown-menu show">
                  <Link to="/rentalBis" className="dropdown-item">Bus</Link>
                  <Link to="/rental" className="dropdown-item">Mobil</Link>
                </div>
              )}
            </Link>
            <Link to="/contact" smooth>Contact</Link>
            {isLoggedIn ? (
              <Link to='/home' onClick={logout} className="btn-login">Logout</Link>
            ) : (
              <Link to='/login' className="btn-login">Login</Link>
            )}
          </div>
        </div>
      </header>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-7">
            <img src={`http://localhost:3000/paketwisata/${foto}`} className="img-fluid rounded w-100 mb-4" style={{ height: "400px", objectFit: "cover" }} alt="Tour Image" />
            <hr style={{ border: "2px solid #ffa101" }} />
            <h4 className="mt-3 pl-2">{namapaket}</h4>
            <hr style={{ border: "2px solid #ffa101" }} />

            <p className="text-muted">{deskripsi}</p>
          </div>

         {/* form */}
          <div className="col-md-5">
            <div className="card p-4 shadow-sm border-0">
              <h4 className='mb-4 fw-bold text-center'>Booking Now</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Jumlah</label>
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    max="4"
                    value={jumlah}
                    onChange={(e) => setJumlah(Number(e.target.value) || 1)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Harga per orang</label>
                  <input
                    type="text"
                    className="form-control"
                    value={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(harga)}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Total</label>
                  <input
                    type="text"
                    className="form-control"
                    value={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(jumlah * harga)}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Upload Bukti Pembayaran</label>
                  <input type="file" className="form-control" name="bukti_pembayaran" />
                </div>
                <button type="submit" className="btn btn-warning w-100 mt-3">Pesan</button>
              </form>
              <a href="http://wa.me/6283141615219" className="btn btn-outline-warning w-100 mt-2 mb-4">Hubungi Untuk Info Lebih Lanjut</a>
            </div>
          </div>

        </div>
      </div>

      <div className="shadow p-3 bg-body-tertiary rounded ">
        <footer className="py-3 my-4">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Home</Link></li>
            <li className="nav-item"><Link to="/home#about_us" className="nav-link px-2 text-muted">About Us</Link></li>
            <li className="nav-item"><Link to="/home#paket_wisata" className="nav-link px-2 text-muted">Paket Wisata</Link></li>
            <li className="nav-item"><Link to="/rental" className="nav-link px-2 text-muted">Rentals</Link></li>
            <li className="nav-item"><Link to="/contact" className="nav-link px-2 text-muted">Contact</Link></li>
          </ul>
          <p className="text-center text-muted">Copyright 2025, design and developed by me. All rights reserved</p>
        </footer>
      </div>

    </div>
  );
};

export default Pesan;
