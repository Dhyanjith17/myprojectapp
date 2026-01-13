import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the user is on a protected/dashboard page
  const isLoggedIn = location.pathname === '/selection' || location.pathname.includes('/admin');

  const handleLogout = () => {
    // Logic for logout goes here (e.g., clearing tokens)
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="logo"><span className="logo-accent">W</span>inner</Link>
        </div>
        
        <ul className="navbar-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/tournaments" className="nav-link">Tournaments</Link></li>
        </ul>

        <div className="navbar-auth">
          {isLoggedIn ? (
            /* Show this when logged in (Selection Page) */
            <>
              <span className="user-welcome">Welcome, Admin</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            /* Show this when logged out (Home Page) */
            <>
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/register" className="register-btn">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;