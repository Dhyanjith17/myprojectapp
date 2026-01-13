import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectionPage.css';

const SelectionPage = () => {
  const navigate = useNavigate();

  return (
    <div className="selection-container">
      <h2>Welcome! What would you like to do?</h2>
      <div className="selection-grid">
        <button onClick={() => navigate('/admin/create-tournament')}>
          Create Tournament
        </button>
        <button onClick={() => navigate('/tournaments')}>
          View Tournaments
        </button>
        <button onClick={() => navigate('/profile')}>
          View Profile
        </button>
      </div>
    </div>
  );
};

export default SelectionPage;