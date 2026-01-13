import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import SelectionPage from './SelectionPage';
import CreateTournament from './pages/CreateTournament';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        {/* Navbar Section */}
        <nav className="navbar">
          <div className="nav-logo">
            <Link to="/">Winner</Link> 
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link> 
            <Link to="/login" className="nav-btn-login">Login</Link> 
            <Link to="/register" className="nav-btn-reg">Register</Link> 
          </div>
        </nav>

        {/* Content Section */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomeHero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/selection" element={<SelectionPage />} />
            <Route path="/admin/create-tournament" element={<CreateTournament />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const HomeHero = () => (
  <div className="hero-section">
    <div className="overlay">
      <h1>Tournament Manager</h1>
      <p>Simplify the creation, management, and monitoring of sports and competitive events.</p>
      <div className="hero-btns">
        <Link to="/register" className="hero-main-btn">Get Started</Link>
        <Link to="/login" className="hero-sub-btn">Login</Link>
      </div>
    </div>
  </div>
);

export default App;