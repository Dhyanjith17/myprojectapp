import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectionPage.css';

const SelectionPage = ({ userRole }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">
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
            <h3>Create Tournament</h3>
            <p>Configure sports, rules, entry fees, and organizer details in a multi-step builder.</p>
            <div className="bento-icon">🏆</div>
          </div>
        </div>

        {/* Primary Action: View */}
        <div className="bento-item medium browse" onClick={() => navigate('/tournaments')}>
          <div className="bento-content">
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

        {/* CONDITIONAL CARD: Shows Admin Dashboard if user is admin, otherwise Leaderboards */}
        {userRole === 'admin' ? (
          <div className="bento-item small admin-panel" onClick={() => navigate('/admin/dashboard')} style={{ border: '2px solid #2ecc71' }}>
            <div className="bento-content">
              <span className="bento-tag" style={{ background: '#2ecc71', color: 'white' }}>Admin Only</span>
              <h3>Approvals</h3>
              <p>Review pending tournaments.</p>
              <div className="bento-icon" style={{ fontSize: '2rem' }}>⚙️</div>
            </div>
          </div>
        ) : (
          <div className="bento-item small analytics">
            <div className="bento-content">
              <span className="bento-tag upcoming">Upcoming</span>
              <h3>Leaderboards</h3>
              <p>Track points and top performers.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectionPage;