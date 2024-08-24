import React from "react";
import "./Header.scss";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="https://www.jiomart.com/assets/ds2web/images/Jiomart-logo-ds2.0.svg?v=24" />
      </div>
      <div className="location">
        <i className="fas fa-map-marker-alt"></i>
        <span>Deliver to Mumbai 400020</span>
      </div>
      <div className="search-bar">
        <FaSearch className="search" />
        <input type="text" placeholder="Search JioMart" />
        <i className="fas fa-bars"></i>
      </div>
      <div className="nav-icons">
        <FaCartShopping className="cart" />
        <div className="sign-in">
          <FaUser className="user"/>
          Sign In
        </div>
      </div>
    </header>
  );
}

export default Header;
