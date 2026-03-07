import React, { useEffect, useState, useContext } from 'react';
import logo from "../assets/frontend_assets/logo.png";
import searchIcon from "../assets/frontend_assets/search_icon.png";
import profileIcon from "../assets/frontend_assets/profile_icon.png";
import cartIcon from "../assets/frontend_assets/cart_icon.png";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { productContext } from '../context/Products';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

function Nav() {
  // const [cart, setCart] = useState(0)

  const { back_URL, cart } = useContext(productContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {    
    axios.get(`${back_URL}/logout`, { withCredentials: true })
      .then(() => {
        toast.success("Logout Successfully.")
        localStorage.removeItem('email')
      })
      .then(() => {
        setTimeout(() => {
            window.location.reload();
          }, 1000);
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  };

  useEffect(() => {
    const email = getCookie("email");
    setIsLoggedIn(!!email);9 
  });

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container">

        {/* Logo */}
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="logo" style={{ height: "40px" }} />
        </NavLink>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse justify-content-between" id="navbarContent">

          {/* Menu Links */}
          <ul className="navbar-nav mx-auto gap-lg-4 text-center">

            <li className="nav-item nav-pages">
              <NavLink to="/" className="nav-link">HOME</NavLink>
            </li>

            <li className="nav-item nav-pages">
              <NavLink to="/collection" className="nav-link">COLLECTION</NavLink>
            </li>

            <li className="nav-item nav-pages">
              <NavLink to="/about" className="nav-link">ABOUT</NavLink>
            </li>

            <li className="nav-item nav-pages">
              <NavLink to="/contact" className="nav-link">CONTACT</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/admin" className="btn btn-outline-secondary rounded-pill px-3">
                Admin Panel
              </NavLink>
            </li>

          </ul>

          {/* Icons */}
          <div className="d-flex align-items-center gap-3 justify-content-center">

            <Link to="/collection">
              <img src={searchIcon} className="nav-icon" alt="search" />
            </Link>

            {/* Profile */}
            <div className="dropdown">
              <img
                src={profileIcon}
                className="nav-icon dropdown-toggle"
                data-bs-toggle="dropdown"
                alt="profile"
              />

              <ul className="dropdown-menu dropdown-menu-end">

                {isLoggedIn ? (
                  <>
                    <li>
                      <NavLink to="/order" className="dropdown-item">
                        Orders
                      </NavLink>
                    </li>

                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <NavLink to="/login" className="dropdown-item">
                      Login
                    </NavLink>
                  </li>
                )}

              </ul>
            </div>

            {/* Cart */}
            <div className='position-relative'>
            <NavLink to="/cart">
              <img src={cartIcon} className="nav-icon" alt="cart" />
              <p className="cart-icon-count">{cart}</p>
            </NavLink>
            </div>

          </div>

        </div>
      </div>
    </nav>
  );
}

export default Nav;