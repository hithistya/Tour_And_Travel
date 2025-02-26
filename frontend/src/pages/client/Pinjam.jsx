import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashLink as Link } from "react-router-hash-link";
import Swal from "sweetalert2";

const Pinjam = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [foto, setFoto] = useState("");
  const [merk, setMerk] = useState("");
  const [jenis_kendaraan, setJenisKendaraan] = useState("");
  const [plat_no, setPlatNo] = useState("");
  const [kapasitas, setKapasitas] = useState("");
  const [harga, setHarga] = useState("");
  const [status_kendaraan, setStatusKendaraan] = useState("");
  const [tglSewa, setTglSewa] = useState("");
  const [tglPengembalian, setTglPengembalian] = useState("");
  const [totalHarga, setTotalHarga] = useState(0);

  const Id = localStorage.getItem("id");

  const toggleMenu = () => {
    setIsActive((prevState) => !prevState);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const Id = localStorage.getItem("id");
    if (token) {
      setIsLoggedIn(true);
      getKendaraan(token);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false)
    window.location.href = "/home";
  }
  const getKendaraan = async (token) => {
    try {
      const response = await fetch(`http://localhost:3000/api/kendaraan/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      const data = await response.json();
      setFoto(data.foto);
      setMerk(data.merk);
      setJenisKendaraan(data.jenis_kendaraan);
      setPlatNo(data.plat_no);
      setKapasitas(data.kapasitas);
      setHarga(data.harga);
      setStatusKendaraan(data.status_kendaraan);
    } catch (error) {
      console.error("Gagal mengambil data kendaraan:", error);
    }
  };

  const handleTglSewaChange = (e) => {
    setTglSewa(e.target.value);
    const formattedDate = selectedDate.toISOString().split("T")[0];
    setTglSewa(formattedDate)
  };

  const handleTglPengembalianChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const formattedDate = selectedDate.toISOString().split("T")[0];
    setTglPengembalian(formattedDate);
  };


  const calculateTotalHarga = () => {
    if (tglSewa && tglPengembalian) {
      const startDate = new Date(tglSewa);
      const endDate = new Date(tglPengembalian);

      const selisihHari = Math.ceil((endDate - startDate) / (1000 * 3600 * 24));
      const totalHari = selisihHari > 0 ? selisihHari : 1;
      const total = totalHari * harga;
      setTotalHarga(total);
    }
  };

  useEffect(() => {
    calculateTotalHarga();
  }, [tglSewa, tglPengembalian]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: 'error',
        text: 'Anda harus login untuk menyewa kendaraan.',
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("kendaraan_id", id);
      formData.append("members_id", Id);
      formData.append("tgl_sewa", tglSewa);
      formData.append("tgl_kembali", tglPengembalian);
      formData.append("status_pembayaran", "Belum Dibayar");
      formData.append("status_sewa", "Pending");

      const fileInput = event.target.querySelector('input[type="file"]');
      const file = fileInput ? fileInput.files[0] : null;

      if (file) {
        formData.append("file", file);
      }

      const response = await fetch('http://localhost:3000/api/rentals', {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      console.log("Response status:", response.status);
      console.log("Response result:", result);

      if (!response.ok) {
        Swal.fire({
          icon: 'error',
          text: result.message || 'Terjadi kesalahan saat menyimpan data.',
        });
        return;
      }

      const updateResponse = await fetch(`http://localhost:3000/api/status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status_kendaraan: "tidak tersedia" }),
      });

      const updateResult = await updateResponse.json();
      console.log("Update status response:", updateResponse.status);
      console.log("Update status result:", updateResult);

      if (!updateResponse.ok) {
        Swal.fire({
          icon: 'warning',
          text: 'Kendaraan berhasil disewa, tetapi status tidak dapat diperbarui.',
        });
        return;
      }

      event.target.reset();
      Swal.fire({
        icon: 'success',
        text: 'Kendaraan berhasil disewa!',
        timer: 2000,
      }).then(() => {
        window.location.href = "/home";
        window.location.href = reload();
      });

    } catch (error) {
      console.error('Error during the fetch request:', error);
      Swal.fire({
        icon: 'error',
        text: 'Terjadi kesalahan saat menghubungi server.',
      });
    }
};

  const today = new Date().toISOString().split("T")[0];
  return (
    <div>
      <header>
        <a href="#" className="brand">Tour &amp; Travel</a>
        <div className="menu-btn" onClick={toggleMenu} />
        <div className={`navigation ${isActive ? "active" : ""}`}>
          <div className="navigation-items">
            <Link to="/home">Home</Link>
            <Link to="/home#about_us" smooth>About Us</Link>
            <Link to="/home#paket_wisata" smooth>Paket Wisata</Link>
            <Link
              className="btn ii p-0 ml-0 sm-p-0 lg-p-0"
              onClick={() => setIsOpen(!isOpen)}
              style={{ fontWeight: '500' }}
            >
              Rentals
            </Link>
            <Link to="/contact" smooth>Contact</Link>
            {isLoggedIn ? (
              <Link to="/home" onClick={logout} className="btn-login">Logout</Link>
            ) : (
              <Link to="/login" className="btn-login">Login</Link>
            )}
          </div>
        </div>
      </header>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-7 position-relative">
            <div
              className="position-absolute top-0 start-0 m-2 badge"
              style={{ backgroundColor: status_kendaraan === "Available" ? "green" : "red", color: "white", padding: '6px 25px' }}
            >
              {status_kendaraan}
            </div>
            <img
              src={`http://localhost:3000/kendaraan/${foto}`}
              style={{ height: "470px", objectFit: "cover" }}
              className="img-fluid rounded w-100"
              alt="Rental Image"
            />
            <hr />
            <div className="container mb-0">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <i className="fas fa-car-side text-muted" style={{ marginRight: "10px" }}></i>
                  <p className="text-muted mb-0">{merk}</p>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fas fa-tag text-muted" style={{ marginRight: "10px" }}></i>
                  <p className="text-muted mb-0">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(harga)}
                  </p>
                </div>
              </div>
              <hr />
              <h4>Syarat Peminjaman Kendaraan</h4>
              <p style={{ left: '0' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident natus
                architecto recusandae repellat, quo rem minima eos nisi
                commodi labore voluptas, iure neque omnis quibusdam qui assumenda doloribus illo asperiores.
              </p>
              <hr />
            </div>
          </div>
          {/* Rental Form */}
          <div className="col-md-5">
            <div className="card p-4 shadow-sm border-0 position-sticky">
              <h4 className="mb-4 fw-bold text-center">Sewa Sekarang</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Tgl Sewa</label>
                  <input
                    type="date"
                    className="form-control"
                    min={today}
                    value={tglSewa}
                    onChange={handleTglSewaChange}
                  />

                </div>
                <div className="mb-3">
                  <label className="form-label">Tgl Pengembalian</label>
                  <input

                    type="date"
                    className="form-control"
                    min={today}
                    value={tglPengembalian}
                    onChange={handleTglPengembalianChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Harga</label>
                  <input
                    type="text" 
                    className="form-control"
                    value={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(harga)}
                    readOnly
                  />

                </div>
                <div className="mb-3">
                  <label className="form-label">Total Harga</label>
                  <input
                    type="text" 
                    className="form-control"
                    value={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalHarga)}
                    readOnly
                  />

                </div>
                <div className="mb-3">
                  <label className="form-label">Upload Bukti Pembayaraan</label>
                  <input type="file" className="form-control" />
                </div>
                <button type="submit" className="btn btn-warning w-100 mt-3">Sewa</button>
              </form>
              <a href="http://wa.me/6283141615219" className="btn btn-outline-warning w-100 mt-2 mb-4">
                Hubungi Untuk Info Lebih Lanjut
              </a>
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

export default Pinjam;
