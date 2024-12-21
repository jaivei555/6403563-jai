import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <i className="fas fa-spray-can"></i>
          Perfume Store
        </Link>
        <Link to="/add" className="add-button">
          <i className="fas fa-plus"></i>
          เพิ่มน้ำหอม
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;