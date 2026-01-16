import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo Section - Aligned to Left */}
        <div className="nav-logo">
          <Link to="/">
            <div className="logo-icon" style={{ display: 'inline-block', marginRight: '10px', background: '#2ecc71', padding: '2px 8px', borderRadius: '5px' }}>W</div>
            Winner
          </Link>
        </div>

        {/* Navigation Links - Only visible AFTER login */}
        {isLoggedIn && (
          <div className="nav-links-center" style={{ display: 'flex', gap: '25px' }}>
            <Link to="/" className="nav-item" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
            <Link to="/tournaments" className="nav-item" style={{ color: 'white', textDecoration: 'none' }}>Tournaments</Link>
            <Link to="/selection" className="nav-item" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
          </div>
        )}

        {/* Auth Actions - Aligned to Right */}
        <div className="nav-auth">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="login-link">Login</Link>
              <Link to="/register" className="register-btn">Register</Link>
            </>
          ) : (
            /* Show Logout button after login */
            <Link 
              to="/" 
              className="register-btn" 
              onClick={onLogout} 
              style={{ backgroundColor: '#ff4d4d', color: 'white' }}
            >
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;