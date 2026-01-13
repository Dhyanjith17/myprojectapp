import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Restore Link for navigation
import './TournamentList.css';

const TournamentList = () => {
  const [selectedSport, setSelectedSport] = useState('All');
  const [feeFilter, setFeeFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const [tournaments] = useState([
    { id: 1, name: "Elite Cricket Championship", sport: "Cricket", date: "Jan 15, 2026", location: "Mumbai Stadium", fee: 25, isFree: false, status: "Open" },
    { id: 2, name: "City Soccer League", sport: "Football", date: "Feb 10, 2026", location: "Downtown Arena", fee: 0, isFree: true, status: "Ongoing" },
    { id: 3, name: "Pro Basketball Open", sport: "Basketball", date: "Mar 05, 2026", location: "Madison Square", fee: 15, isFree: false, status: "Open" },
    { id: 4, name: "Volley Blast 2026", sport: "Volleyball", date: "Apr 20, 2026", location: "Beach Arena", fee: 0, isFree: true, status: "Closed" },
  ]);

  const filteredData = tournaments.filter((t) => {
    const matchesSport = selectedSport === 'All' || t.sport === selectedSport;
    const matchesFee = feeFilter === 'All' || (feeFilter === 'Free' && t.isFree) || (feeFilter === 'Paid' && !t.isFree);
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSport && matchesFee && matchesSearch;
  });

  return (
    <div className="list-page-wrapper">
      {/* RESTORED: Original Header Navigation Area */}
      <nav className="navbar">
        <Link to="/" className="logo">Winner</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/tournaments">Tournaments</Link>
          <Link to="/login">Login</Link>
          <Link to="/register" className="nav-reg">Register</Link>
        </div>
      </nav>

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
              <h1>Tournaments</h1>
              <p>Discover and join the best sports events.</p>
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
            {filteredData.map(t => (
              <div key={t.id} className="tourney-card-premium">
                <div className="card-top-info">
                  <span className={`status-pill ${t.status.toLowerCase()}`}>{t.status}</span>
                  <div className="sport-indicator">{t.sport}</div>
                </div>
                <div className="card-mid">
                  <h3>{t.name}</h3>
                  <div className="loc-date">
                    <span>📅 {t.date}</span>
                    <span>📍 {t.location}</span>
                  </div>
                </div>
                <div className="card-bottom">
                  <div className="price-tag-v2">
                    {t.isFree ? <span className="free-label">Free Entry</span> : <span>${t.fee}.00</span>}
                  </div>
                  <button className="join-action-btn">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TournamentList;