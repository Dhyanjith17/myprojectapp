import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';

// Import the Navbar component
import Navbar from './Navbar'; 

// Importing your components from the root src folder
import Login from './Login';
import Register from './Register';
import SelectionPage from './SelectionPage';
import CreateTournament from './CreateTournament';
import TournamentList from './TournamentList';
import AdminDashboard from './AdminDashboard'; 

// ... (keep other imports same)

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('user'); 
  const [tournaments, setTournaments] = useState([]);

  const rejectTournament = (id) => {
    setTournaments(tournaments.filter(t => t.id !== id));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('user');
  };

  const addTournament = (newTournament) => {
    // This captures all fields: name, sport, overs, duration, quarters, etc.
    setTournaments([...tournaments, { ...newTournament, id: Date.now(), status: 'pending' }]);
  };

  // FIXED: Logic for Admin to approve while keeping all data fields
  const approveTournament = (id) => {
    setTournaments(tournaments.map(t => 
      t.id === id ? { ...t, status: 'live' } : t
    ));
  };

  return (
    <Router>
      <div className="app-wrapper">
        <Navbar isLoggedIn={isLoggedIn} userRole={userRole} onLogout={handleLogout} />
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomeHero />} />
            <Route path="/login" element={<Login onLogin={(role) => { setIsLoggedIn(true); setUserRole(role); }} />} />
            <Route path="/register" element={<Register onRegister={() => { setIsLoggedIn(true); setUserRole('user'); }} />} />
            <Route path="/selection" element={<SelectionPage userRole={userRole} />} />
            <Route path="/admin/create-tournament" element={<CreateTournament onAdd={addTournament} />} />
            
            {/* The filter here passes the live tournaments down */}
            <Route path="/tournaments" element={<TournamentList tournaments={tournaments.filter(t => t.status === 'live')} />} />

            <Route path="/admin/dashboard" element={
              userRole === 'admin' ? 
              <AdminDashboard 
                tournaments={tournaments} 
                onApprove={approveTournament} 
                onReject={rejectTournament} 
              /> 
              : <Navigate to="/" />
            } />
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
        <Link to="/login" className="hero-sub-btn"> Login</Link>
      </div>
    </div>
  </div>
);

export default App;