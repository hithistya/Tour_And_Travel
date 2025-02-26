import React from 'react'
import { NavLink } from 'react-router-dom'
import "../style/sidebar.css"

const Sidebar = () => {
  const Logout = () => {
    localStorage.removeItem("token")
    window.location.href='/'
  }
  return (
    <>
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-white-primary elevation-4">
        {/* Brand Logo */}
        {/* <a href="#" className="brand-link">
          <img src="" style={{ opacity: '.8' }} />
        </a> */}
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item">
                <NavLink to="/admin/dashboard" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt " />
                  <p className="text">Dashboard</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/users" className="nav-link">
                  <i className="nav-icon fas fa-users" />
                  <p>Users</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/members" className="nav-link">
                  <i className="nav-icon fas fa-user-check " />
                  <p>Members</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/paketwisata" className="nav-link">
                  <i className="nav-icon fas fa-suitcase " />
                  <p>Paket Wisata</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/kendaraan" className="nav-link">
                  <i className="nav-icon fas fa-car" />
                  <p>Kendaraan</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/booking" className="nav-link">
                  <i className="nav-icon fas fa-calendar-check" />
                  <p>Booking</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/rentals" className="nav-link">
                  <i className="nav-icon fas fa-key " />
                  <p>Rentals</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink onClickCapture={Logout} to="/" className="nav-link">
                  <i className="nav-icon fas fa-sign-out-alt " />
                  <p>Logout</p>
                </NavLink>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>

    </>
  )
}

export default Sidebar
