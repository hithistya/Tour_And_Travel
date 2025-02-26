import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import "../../style/home.css";
import Vid1 from "../../assets/video/vid4.mp4"
import Vid2 from "../../assets/video/vidCar.mp4"
import about1 from "../../assets/section_tittle_img.png"
import about2 from "../../assets/about_img.png"
import about3 from "../../assets/shape-1.png"
import place1 from "../../assets/plase_details_1.png"
import place2 from "../../assets/plase_details_2.png"
import { Button } from 'bootstrap';

const Home = () => {
  const [dataPaket, setPaket] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dataKendaraan, setKendaraan] = useState([]);
  const token = localStorage.getItem("token");
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Fungsi untuk menangani klik pada dropdown
  const toggleDropdown = (dropdownId) => {
    if (activeDropdown === dropdownId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdownId);
    }
  };

  const tampilData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/paket", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPaket(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const tampilKendaraan = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/kendaraan", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();


      const mobilData = data
        .filter(kendaraan => kendaraan.jenis_kendaraan === "mobil")
        .sort((a, b) => b.id - a.id)
        .slice(0, 3);
      setKendaraan(mobilData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    tampilData();
    tampilKendaraan();
  }, []);

  // clickfoto
  const handleImageClick = (foto) => {
    Swal.fire({
      imageUrl: `http://localhost:3000/paketwisata/${foto}`,
      imageAlt: "Paket Wisata",
      showCloseButton: true,
      showConfirmButton: false,
      width: '30%',
    });
  };
  const handleImageClick2 = (foto) => {
    Swal.fire({
      imageUrl: `http://localhost:3000/kendaraan/${foto}`,
      imageAlt: "Kendaraan",
      showCloseButton: true,
      showConfirmButton: false,
      width: '30%',
    });
  };

  // herosection
  const [isActive, setIsActive] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  const shortenDescription = (description, maxLength = 100) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };


  useEffect(() => {
    const menuBtn = document.querySelector(".menu-btn");
    const navigation = document.querySelector(".navigation");
    const content = document.querySelector(".content");

    if (isActive) {
      menuBtn.classList.add("active");
      navigation.classList.add("active");
      content.classList.add("active");
    } else {
      menuBtn.classList.remove("active");
      navigation.classList.remove("active");
      content.classList.remove("active");
    }
  }, [isActive]);

  useEffect(() => {
    const btns = document.querySelectorAll(".nav-btn");
    const slides = document.querySelectorAll(".video-slide");
    const contents = document.querySelectorAll(".content");

    btns.forEach((btn, index) => {
      btn.classList.remove("active");
      slides[index].classList.remove("active");
      contents[index].classList.remove("active");
    });

    btns[activeSlide].classList.add("active");
    slides[activeSlide].classList.add("active");
    contents[activeSlide].classList.add("active");
  }, [activeSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % 3);
    }, 4200);

    return () => clearInterval(interval);
  }, [])

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
      <header>
        <a href="#" className="brand">Tour &amp; Travel</a>
        <div className="menu-btn" onClick={toggleMenu} />
        <div className="navigation">
          <div className="navigation-items">
            <ScrollLink to="home" smooth={true} duration={200}>Home</ScrollLink>
            <ScrollLink to="about_us" smooth={true} duration={200}>About</ScrollLink>
            <ScrollLink to="paket_wisata" smooth={true} duration={200}>Paket Wisata</ScrollLink>
            <Link className="dropdown" style={{ textDecoration: 'none' }}>
              <button
                className="btn ii p-0 ml-0 sm-p-0 lg-p-0"
                onClick={() => toggleDropdown('rentals')}
                style={{ fontWeight: '500' }}
              >
                Rentals
              </button>
              {activeDropdown === 'rentals' && (
                <div className="dropdown-menu show">
                  <Link to="/rentalBis" className="dropdown-item">Bus</Link>
                  <Link to="/rental" className="dropdown-item">Mobil</Link>
                </div>
              )}
            </Link>
            <Link to="/contact">Contact</Link>
            <Link className="dropdown" style={{ textDecoration: 'none' }}>
              <button
                className="btn ii p-0 ml-0 sm-p-0 lg-p-0"
                onClick={() => toggleDropdown('login')}
                style={{ fontWeight: '500' }}
              >
                <i className='fas fa-user'></i>
              </button>
              {activeDropdown === 'login' && (
                <div className="dropdown-menu show" style={{ width: '100px', left: '-100px', top: '25px' }}>
                  {isLoggedIn ? (
                    <>
                      <Link to='/edit-profile' className="dropdown-item">
                        Edit Profile
                      </Link>
                      <Link to='/history' className="dropdown-item">
                        History
                      </Link>
                      <Link to='/home' onClick={logout} className="dropdown-item">
                        Logout
                      </Link>
                    </>
                  ) : (
                    <Link to='/login' className="dropdown-item">
                      Login
                    </Link>
                  )}
                </div>
              )}
            </Link>

          </div>
        </div>
      </header>

      <section className="home">
        {/* Video Slides */}
        <video className="video-slide active" src={Vid1} autoPlay muted loop />
        <video className="video-slide" src={Vid2} autoPlay muted loop />
        <video className="video-slide" src={Vid2} autoPlay muted loop />

        {/* Content */}
        <div className="content active">
          <h1>Eksplorasi<br /><span>Tanpa Batas</span></h1>
          <p>Rasakan perjalanan yang berbeda dengan pengalaman unik dan layanan terbaik di setiap destinasi.
            Kami mengutamakan kenyamanan dan kepuasan Anda,
            memastikan setiap langkah perjalanan menjadi kenangan tak terlupakan</p>
          <ScrollLink smooth={true} duration={200} to="paket_wisata" className='ii'>Booking Now</ScrollLink>
        </div>
        <div className="content">
          <h1>Perjalanan<br /><span>Tanpa Ribet</span></h1>
          <p>Sewa bis dengan fasilitas lengkap dan pengemudi berpengalaman untuk memastikan perjalanan Anda lancar dan menyenangkan</p>
          <ScrollLink smooth={true} duration={200} to="rent_bus" className='ii'>Rent Now</ScrollLink>
        </div>
        <div className="content">
          <h1>Sewa Mobil<br /><span>Terpercaya</span></h1>
          <p>Nikmati kebebasan untuk menjelajah dengan berbagai pilihan mobil yang dapat disesuaikan dengan kebutuhan perjalanan Anda</p>
          <ScrollLink smooth={true} duration={200} to="rent_car" className='ii'>Rent Now</ScrollLink>
        </div>

        {/* Social Media Icons */}
        <div className="media-icons">
          <a href="#"><i style={{ color: '#fff' }} className="fab fa-facebook" /></a>
          <a href="#"><i style={{ color: '#fff' }} className="fab fa-instagram" /></a>
          <a href="#"><i style={{ color: '#fff' }} className="fab fa-youtube" /></a>
        </div>

        {/* Slider Navigation */}
        <div className="slider-navigation">
          <div className={`nav-btn ${activeSlide === 0 ? 'active' : ''}`} onClick={() => handleSlideChange(0)} />
          <div className={`nav-btn ${activeSlide === 1 ? 'active' : ''}`} onClick={() => handleSlideChange(1)} />
          <div className={`nav-btn ${activeSlide === 2 ? 'active' : ''}`} onClick={() => handleSlideChange(2)} />
        </div>
      </section>

      {/* feature_part start*/}
      <section className="feature_part" id='about_us'>
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-6">
              <div className="feature_img">
                <img src={about2} width={'95%'} />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="feature_part_text">
                <img src={about1} alt="#" style={{ marginTop: '-120px' }} />
                <h2 style={{ marginTop: '-10px' }}>Amazing Tour & Travel</h2>
                <p>Kami menyediakan paket wisata menarik dan sewa kendaraan yang nyaman untuk perjalanan Anda. Dengan pelayanan profesional,
                  perjalanan Anda akan lebih aman, mudah, dan menyenangkan. Jelajahi destinasi impian dengan layanan tour dan rental terbaik!</p>
                <span> Mari ciptakan pengalaman liburan yang tak terlupakan bersama kami! #TravelWithUs</span>

              </div>
            </div>
          </div>
        </div>
        <img src={about3} alt className="feature_icon_1" />
        <img src={about3} alt className="feature_icon_2" />
        <img src={about3} alt className="feature_icon_3" />
      </section>
      {/* upcoming_event part start*/}

      {/* use sasu part end*/}
      <section className="popular_place padding_top" style={{ marginTop: '-70px' }} id='paket_wisata'>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="section_tittle text-center">
                <img src={about1} alt style={{ marginBottom: '40px' }} />
                <h2 style={{ marginBottom: '20px' }}>Paket Wisata</h2>
                <p style={{ marginBottom: '30px' }}>Nikmati pengalaman liburan seru dengan paket wisata lengkap yang kami tawarkan!</p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {dataPaket.length > 0 ? (
              dataPaket.map((paket, index) => (
                <div className="col-lg-4 col-sm-6">
                  <div className="single_popular_place">

                    <img
                      src={`http://localhost:3000/paketwisata/${paket.foto}`}
                      style={{ height: '200px', objectFit: 'cover', borderRadius: '8px', width: '100%' }}
                      onClick={() => handleImageClick(paket.foto)}
                    />

                    <h4>{paket.namapaket}</h4>
                    <p>{shortenDescription(paket.deskripsi, 100)}</p>
                    <Link to={`/pesan/${paket.id}`} style={{ textDecoration: 'none' }} className="btn1">book now</Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>Data Kosong</p>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* use sasu part end*/}

      {/* about_us part start*/}
      <section className="place_details section_padding" id='rent_bus'>
        <div className="container-fluid">
          <div className="row justify-content-between">
            <div className="col-md-6 col-lg-6">
              <div className="place_detauls_text">
                <div className="row justify-content-center">
                  <div className="col-lg-8 col-xl-6">
                    <div className="place_details_content">
                      <img src={about1} className='hoho' />
                      <h2>Rent a Bus</h2>
                      <p>Butuh transportasi untuk perjalanan wisata, acara keluarga, atau lainnya? Kami menyediakan layanan sewa bus dengan berbagai pilihan armada yang nyaman, aman, dan berfasilitas lengkap.</p>
                      <span> Dengan harga terjangkau dan sopir berpengalaman, perjalanan Anda jadi lebih santai dan menyenangkan!</span>
                    </div>
                  </div>
                </div>
                <img src={place1} alt="#" style={{ width: '100%', marginTop: '-10px', }} className="bb" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="place_details_img">
                <img src={place2} alt="#" className='aa' />
              </div>
            </div>
          </div>
        </div>
        <div className="view_all_btn">
          <Link to="/rentalBis" className="view_btn" style={{}}>view all</Link>
        </div>
      </section>
      {/* about_us part end*/}


      {/* use sasu part end*/}
      <section className="popular_place padding_top" style={{ marginTop: '-70px' }} id='rent_car'>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="section_tittle text-center">
                <img src={about1} alt style={{ marginBottom: '40px' }} />
                <h2 style={{ marginBottom: '20px' }}>Most Popular <span>Car Listings</span> </h2>
                <p style={{ marginBottom: '30px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  sed  do eiusmod tempor incididunt ut</p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            {dataKendaraan.length > 0 ? (
              dataKendaraan.map((kendaraan, index) => (
                <div className="col-lg-4 col-sm-6">
                  <div className="single_popular_place" style={{}}>
                    <div
                      className="position-absolute top-0 start-0 m-2 badge"
                      style={{ backgroundColor: kendaraan.status_kendaraan === "Available" ? "green" : "red", color: "white", padding: '6px 25px' }}
                    >
                      {kendaraan.status_kendaraan}
                    </div>
                    <img
                      src={`http://localhost:3000/kendaraan/${kendaraan.foto}`}
                      style={{ height: '200px', objectFit: 'cover', borderRadius: '8px', width: '100%' }}
                      onClick={() => handleImageClick2(kendaraan.foto)}
                    />
                    <h4>{kendaraan.merk}</h4>
                    {/* <p>{shortenDescription(paket.deskripsi, 100)}</p> */}
                    <Link to={`/pinjam/${kendaraan.id}`} style={{ textDecoration: 'none' }} className="btn1">Rent now</Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>Data Kosong</p>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* use sasu part end*/}


      <div className="site-section " style={{ background: '#fffff' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <h2 className="section-heading"><strong>Testimonials</strong></h2>
              <p className="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 mb-4 mb-lg-0">
              <div className="testimonial-2">
                <div className="mb-4">
                  <p>"huhuhu Seru banget liburanku kali ini, Terimakasih atas pengalaman perjalanan yang luar biasanya!"</p>
                </div>
                <div className="d-flex v-card align-items-center">
                  <img src="https://i.pinimg.com/474x/14/b4/5d/14b45d94bf9373182e7fdfbdc2630921.jpg" alt="Image" className="img-fluid mr-3" />
                  <div className="author-name">
                    <span className="d-block">Mike Fisher</span>
                    <span>Owner, Ford</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4 mb-lg-0">
              <div className="testimonial-2">
                <div className="mb-4">
                  <p>"Tour yang sangat menyenangkan! Semua diatur dengan sempurna, Recommended banget!"</p>
                </div>
                <div className="d-flex v-card align-items-center">
                  <img src="https://i.pinimg.com/474x/0b/79/fb/0b79fb49198506eaa658e32187a63579.jpg" alt="Image" className="img-fluid mr-3" />
                  <div className="author-name">
                    <span className="d-block">Jean Stanley</span>
                    <span>Traveler</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4 mb-lg-0">
              <div className="testimonial-2">
                <div className="mb-4">
                  <p>"Pengalaman tour yang luar biasa! Pelayanan ramah, Pasti akan booking lagi!"</p>
                </div>
                <div className="d-flex v-card align-items-center">
                  <img src="https://i.pinimg.com/736x/d0/6e/b3/d06eb3682c848ccc76bf5d8181c9f98a.jpg" alt="Image" className="img-fluid mr-3" />
                  <div className="author-name">
                    <span className="d-block">Katie Rose</span>
                    <span>Customer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="site-section py-5" style={{ background: '#ffcc00' }}>
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-7 mb-4 mb-md-0">
              <h2 class="mb-1 text-white">What are you waiting for?</h2>
              <p class="mb-1 opa-7">Jangan tunggu lagi! Segera booking sekarang dan dapatkan pengalaman seru</p>
            </div>
            <div class="col-lg-5 text-md-right">
              <ScrollLink smooth={true} duration={200} to='paket_wisata' class="btn  btn-white" style={{ background: '#fff' }}>Booking now</ScrollLink>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="shadow p-3 bg-body-tertiary rounded ">
        <footer className="py-3 my-4">
          <ul className="nav justify-content-center border-bottom pb-3  mb-3">
            <li className="nav-item">
              <a className="nav-link px-2 text-muted" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-2 text-muted" href="#">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-2 text-muted" href="#">Paket Wisata</a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-2 text-muted" href="#">Rentals</a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-2 text-muted" href="#">Contact</a>
            </li>
          </ul>
          <p className="text-center text-muted">Copyright 2025, design and developed by me. All rights reserved</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
