import React, { useState, useEffect } from 'react'
import '../../style/contact.css'
import { HashLink as Link } from "react-router-hash-link";

const Contact = () => {
    const [isActive, setIsActive] = useState(false);
    const [isOpen, setIsOpen] = useState(false);  

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

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

    return (
        <div>
            <header style={{ marginBottom: '40px' }}>
                <a href="#" className="brand">Tour &amp; Travel</a>
                <div className="menu-btn" onClick={toggleMenu} />
                <div className={`navigation ${isActive ? 'active' : ''}`}>
                    <div className="navigation-items">
                        <Link to="/home">
                            Home
                        </Link>
                        <Link to="/home#about_us" smooth>
                            About Us
                        </Link>
                        <Link to="/home#paket_wisata" smooth>
                            Paket Wisata
                        </Link>
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
                        <Link to="/contact" smooth>
                            Contact
                        </Link>
                        {isLoggedIn ? (
                            <Link to='/home' onClick={logout} className="btn-login">Logout</Link>
                        ) : (
                            <Link to='/login' className="btn-login">Login</Link>
                        )}
                    </div>
                </div>
            </header>

            <div className='container'>
                <div className="row">
                    <div className="col-12">
                        <h2 className="contact-title">Send Now</h2>
                    </div>
                    <div className="col-lg-8">
                        <form className="form-contact contact_form" action="contact_process.php" method="post" id="contactForm" noValidate="novalidate">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <textarea className="form-control w-100" name="message" id="message" cols={30} rows={9} onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Message'" placeholder="Enter Message" defaultValue={""} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input className="form-control" name="name" id="name" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter your name'" placeholder="Enter your name" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input className="form-control" name="email" id="email" type="email" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter email address'" placeholder="Enter email address" />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <input className="form-control" name="subject" id="subject" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Subject'" placeholder="Enter Subject" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <button type="submit" className="button button-contactForm btn_1 rounded">Send Message</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-4">
                        <div className="media contact-info">
                            <span className="contact-info__icon"><i className="fa fa-home" /></span>
                            <div className="media-body">
                                <h3>Ponorogo, Jawa Timur</h3>
                                <p>Jl.Kalimantan, CA 91770</p>
                            </div>
                        </div>
                        <div className="media contact-info">
                            <span className="contact-info__icon"><i className="fa fa-phone" /></span>
                            <div className="media-body">
                                <h3>088809876789</h3>
                                <p>senin sampai jumat 9am sampai 6pm</p>
                            </div>
                        </div>
                        <div className="media contact-info">
                            <span className="contact-info__icon"><i className="fa fa-envelope" /></span>
                            <div className="media-body">
                                <h3>supportTour@gmail.com</h3>
                                <p>Bagikan email mu kapanpun!</p>
                            </div>
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
}

export default Contact;
