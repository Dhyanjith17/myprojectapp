import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Importing your components from the root src folder
import Login from './Login';
import Register from './Register';
import SelectionPage from './SelectionPage';
import CreateTournament from './CreateTournament';
import TournamentList from './TournamentList';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        {/* If you had a Navbar component, place it here. 
            Otherwise, this is your original structure. */}
        
        <div className="main-content">
          <Routes>
            {/* Restoring your original Home Page UI exactly */}
            <Route path="/" element={<HomeHero />} />

            {/* Connecting all other pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/selection" element={<SelectionPage />} />
            <Route path="/admin/create-tournament" element={<CreateTournament />} />
            <Route path="/tournaments" element={<TournamentList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// RESTORED: Your original Home Page code
const HomeHero = () => (
  <div className="hero-section">
    <div className="overlay">
      <h1>Tournament Manager</h1>
      <p>
        Simplify the creation, management, and monitoring of sports and competitive events.
      </p>
      <div className="hero-btns">
        <Link to="/register" className="hero-main-btn">Get Started</Link>
        <Link to="/login" className="hero-sub-btn"> Login</Link>
      </div>
    </div>
  </div>
);

export default App;