import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SelectionPage.css';

const SelectionPage = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">
      {/* Navbar Section */}
      <nav className="navbar">
        <Link to="/" className="logo">Winner</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/tournaments">Tournaments</Link>
          <Link to="/login">Login</Link>
          <Link to="/register" className="nav-reg">Register</Link>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="dash-header">
        <h1>Management Console</h1>
        <p>Select a module to manage your sporting ecosystem.</p>
      </header>

      {/* Bento Grid Layout */}
      <div className="bento-grid">
        {/* Primary Action: Create */}
        <div className="bento-item large create" onClick={() => navigate('/admin/create-tournament')}>
          <div className="bento-content">
            <span className="bento-tag">Admin</span>
            <h3>Create Tournament</h3>
            <p>Configure sports, rules, entry fees, and organizer details in a multi-step builder.</p>
            <div className="bento-icon">🏆</div>
          </div>
        </div>

        {/* Primary Action: View */}
        <div className="bento-item medium browse" onClick={() => navigate('/tournaments')}>
          <div className="bento-content">
            <span className="bento-tag">User</span>
            <h3>Browse Events</h3>
            <p>Search and filter active tournaments across all sports.</p>
            <div className="bento-icon">🔍</div>
          </div>
        </div>

        {/* Future Module: Fixtures */}
        <div className="bento-item small fixtures">
          <div className="bento-content">
            <span className="bento-tag upcoming">Upcoming</span>
            <h3>Match Fixtures</h3>
            <p>Generate brackets and schedules.</p>
          </div>
        </div>

        {/* Future Module: Teams */}
        <div className="bento-item small teams">
          <div className="bento-content">
            <span className="bento-tag upcoming">Upcoming</span>
            <h3>Team Directory</h3>
            <p>Manage registered team rosters.</p>
          </div>
        </div>

        {/* Future Module: Analytics */}
        <div className="bento-item small analytics">
          <div className="bento-content">
            <span className="bento-tag upcoming">Upcoming</span>
            <h3>Leaderboards</h3>
            <p>Track points and top performers.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionPage;