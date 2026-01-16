import React, { useState } from 'react';
import './TournamentList.css';

const TournamentList = ({ tournaments }) => {
  const [selectedSport, setSelectedSport] = useState('All');
  const [feeFilter, setFeeFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [viewingTournament, setViewingTournament] = useState(null);

  const filteredData = tournaments.filter((t) => {
    const matchesSport = selectedSport === 'All' || t.sport === selectedSport;
    const matchesFee = feeFilter === 'All' || (feeFilter === 'Free' && (t.isFree || t.fee === 0)) || (feeFilter === 'Paid' && (!t.isFree && t.fee > 0));
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSport && matchesFee && matchesSearch;
  });

  return (
    <div className="list-page-wrapper">
      <div className="bg-blur-circle-1"></div>
      <div className="bg-blur-circle-2"></div>
      
      <div className="list-container">
        <aside className="sidebar-glass">
          <div className="sidebar-top">
            <h3>Filters</h3>
            <button className="text-reset-btn" onClick={() => {setSelectedSport('All'); setFeeFilter('All');}}>
              Clear All
            </button>
          </div>

          <div className="filter-block">
            <span className="filter-label">Category</span>
            <div className="vertical-chips">
              {['All', 'Cricket', 'Football', 'Basketball', 'Volleyball'].map(s => (
                <button 
                  key={s} 
                  className={`chip-v ${selectedSport === s ? 'active' : ''}`}
                  onClick={() => setSelectedSport(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-block">
            <span className="filter-label">Entry Type</span>
            <div className="entry-toggle-group">
              {['All', 'Free', 'Paid'].map(f => (
                <button 
                  key={f} 
                  className={`entry-btn ${feeFilter === f ? 'active' : ''}`}
                  onClick={() => setFeeFilter(f)}
                >
                  {f === 'Paid' && <span className="fee-icon">$</span>}
                  {f}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="main-feed">
          <div className="top-search-section">
            <div className="title-group">
              <h1>Active Tournaments</h1>
              <p>Discover and join the best sports events currently live.</p>
            </div>
            <div className="search-pill">
              <input 
                type="text" 
                placeholder="Search by name or venue..." 
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="tourney-grid">
            {filteredData.length === 0 ? (
              <div className="no-results">
                <p>No tournaments found matching your criteria.</p>
              </div>
            ) : (
              filteredData.map(t => (
                <div key={t.id} className="tourney-card-premium">
                  <div className="card-top-info">
                    <span className={`status-pill ${(t.status || 'open').toLowerCase()}`}>
                      {t.status || 'Open'}
                    </span>
                    <div className="sport-indicator">{t.sport}</div>
                  </div>
                  <div className="card-mid">
                    <h3>{t.name}</h3>
                    <div className="loc-date">
                      <span>📅 {t.date || 'TBD'}</span>
                      <span>📍 {t.location}</span>
                    </div>
                  </div>
                  <div className="card-bottom">
                    <div className="price-tag-v2">
                      {t.isFree || t.fee === 0 ? <span className="free-label">Free Entry</span> : <span>${t.fee}.00</span>}
                    </div>
                    <button className="join-action-btn" onClick={() => setViewingTournament(t)}>
                      View Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      // ... (keep state logic same)

{/* --- REFINED PREMIUM DETAILS MODAL --- */}
{viewingTournament && (
  <div className="modal-overlay" onClick={() => setViewingTournament(null)}>
    <div className="details-modal" onClick={(e) => e.stopPropagation()}>
      <button className="close-modal-btn" onClick={() => setViewingTournament(null)}>&times;</button>
      
      <div className="modal-inner">
        <header className="modal-hero">
          <span className="sport-badge">{viewingTournament.sport}</span>
          <h2>{viewingTournament.name}</h2>
          <div className="hero-meta">
             <span>🗓️ {viewingTournament.date || "Date TBD"}</span>
             <span>📍 {viewingTournament.location}</span>
          </div>
        </header>

        <div className="modal-grid">
          <section className="modal-section">
            <label>Tournament Details</label>
            <div className="rules-display">
              {/* FIXED: Directly displaying values from the object */}
              {viewingTournament.sport === 'Cricket' && (
                <div className="rule-item">
                  <strong>Overs per Inning:</strong> {viewingTournament.overs || "Not set"}
                </div>
              )}
              {viewingTournament.sport === 'Football' && (
                <div className="rule-item">
                  <strong>Match Duration:</strong> {viewingTournament.duration ? `${viewingTournament.duration} mins per half` : "Not set"}
                </div>
              )}
              {(viewingTournament.sport === 'Basketball' || viewingTournament.sport === 'Volleyball') && (
                <div className="rule-item">
                  <strong>Match Structure:</strong> {viewingTournament.quarters ? `${viewingTournament.quarters} Quarters/Sets` : "Not set"}
                </div>
              )}
            </div>
          </section>

          <section className="modal-section">
            <label>Instructions</label>
            <p className="description-text">
              {viewingTournament.instructions || "No specific instructions provided."}
            </p>
          </section>

          <section className="modal-section contact-box">
            <label>Contact Organizer</label>
            <div className="contact-info">
              <span>📞 {viewingTournament.contact}</span>
            </div>
          </section>
        </div>

        <footer className="modal-action-bar">
          <div className="price-info">
             <small>Entry Fee</small>
             <p>{viewingTournament.isFree || viewingTournament.fee === 0 ? "FREE" : `$${viewingTournament.fee}.00`}</p>
          </div>
          <button className="confirm-register-btn" onClick={() => alert('Registration logic coming soon!')}>
            Register Now
          </button>
        </footer>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default TournamentList;