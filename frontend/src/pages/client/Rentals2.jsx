import React, { useState, useEffect } from 'react'
import "../../style/rental.css"
import Swal from "sweetalert2"
import { HashLink as Link } from "react-router-hash-link";

const Rentals = () => {
    const [isActive, setIsActive] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [rental, setRental] = useState([])
    const [error, setError] = useState(null);

    const toggleMenu = () => {
        setIsActive(!isActive);
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [])

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false)
        window.location.href = "/home";
      }

    const tampilData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:3000/api/kendaraan", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            const filteredData = data.filter(item => item.jenis_kendaraan === "bis");
            setRental(filteredData);
        } catch (error) {
            console.error("Error fetching data: ", error)
        }
    }

    useEffect(() => {
        tampilData();
    }, []);

    return (
        <div className="bg-light">
            <header style={{ marginBottom: '40px' }}>
                <a href="#" className="brand">Tour &amp; Travel</a>
                <div className="menu-btn" onClick={toggleMenu} />
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

            <div className="container">
                <div className="row">
                    <div className="col-lg-7">
                        <h2 className="section-heading"><strong>Bis Listings</strong></h2>
                        <p className="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                </div>
                <div className="row ">
                    {rental.length > 0 ? (
                        rental.map((item) => (
                            <div className="col-md-6 col-lg-4 mb-4" key={item.plat_no}>
                                <div className="listing d-block align-items-stretch">
                                    <div className="listing-img h-100 mr-4">
                                        <img src={`http://localhost:3000/kendaraan/${item.foto}`} alt={item.merk} className="img-fluid" style={{ objectFit: 'cover', height: '250px', width: '100%' }} />
                                    </div>
                                    <div className="listing-contents h-100">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h3 className="mb-0">{item.merk}</h3>
                                            <span
                                                className="badge"
                                                style={{
                                                    backgroundColor: item.status_kendaraan === "Available" ? "green" : "red",
                                                    color: "white",
                                                    padding: '6px 15px',
                                                    borderRadius: '5px'
                                                }}
                                            >
                                                {item.status_kendaraan}
                                            </span>
                                        </div>

                                        <div className="rent-price d-flex justify-content-between w-100 mt-2">
                                            <div>
                                                <strong>
                                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.harga)}
                                                </strong>
                                                <span className="mx-1">/</span>hari
                                            </div>
                                            <span className="text-end">Kap: {item.kapasitas} orang</span>
                                        </div>
                                        <hr />
                                        <Link to={`/pinjam/${item.id}`} className="btn btn-warning pt-2 pb-2 pl-4 pr-4 btn-sm">Rent Now</Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">Tidak ada kendaraan tersedia.</p>
                    )}
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
}

export default Rentals;
