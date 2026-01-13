import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateTournament.css';

const CreateTournament = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [sport, setSport] = useState('');
  const [isFree, setIsFree] = useState(false);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="create-page-wrapper">
      {/* Header Section */}
      <div className="setup-header">
        <h1>Tournament Setup</h1>
        <p>Define the parameters for your next big event</p>
      </div>

      {/* Progress Tracker */}
      <div className="stepper-container">
        <div className={`step-item ${step >= 1 ? 'active' : ''}`}>
          <div className="step-number">1</div>
          <span>Essentials</span>
        </div>
        <div className="step-line"></div>
        <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
          <div className="step-number">2</div>
          <span>Sport Rules</span>
        </div>
        <div className="step-line"></div>
        <div className={`step-item ${step === 3 ? 'active' : ''}`}>
          <div className="step-number">3</div>
          <span>Publish</span>
        </div>
      </div>

      <div className="main-form-card">
        <form onSubmit={(e) => { e.preventDefault(); alert('Tournament Published!'); navigate('/tournaments'); }}>
          
          {/* STEP 1: ESSENTIALS */}
          {step === 1 && (
            <div className="fade-in">
              <div className="form-section-title">General Info</div>
              <div className="form-grid">
                <div className="input-box">
                  <label>Tournament Name</label>
                  <input type="text" placeholder="e.g. National Open" required />
                </div>
                <div className="input-box">
                  <label>Start Date</label>
                  <input type="date" required />
                </div>
                <div className="input-box full-width">
                  <label>Venue / Location</label>
                  <input type="text" placeholder="Enter stadium or city" required />
                </div>
              </div>

              <div className="form-section-title">Sport</div>
              <div className="sport-selector">
                {['Cricket', 'Football', 'Basketball', 'Volleyball'].map((s) => (
                  <div 
                    key={s} 
                    className={`sport-option ${sport === s ? 'selected' : ''}`}
                    onClick={() => setSport(s)}
                  >
                    <span className="sport-icon">{s[0]}</span>
                    {s}
                  </div>
                ))}
              </div>
              
              <div className="action-row">
                <button type="button" className="btn-primary" onClick={nextStep} disabled={!sport}>
                  Continue to Rules
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: ADAPTIVE RULES */}
          {step === 2 && (
            <div className="fade-in">
              <div className="form-section-title">{sport} Configuration</div>
              <div className="adaptive-card">
                {sport === 'Cricket' && (
                  <div className="input-box">
                    <label>Overs per Inning</label>
                    <input type="number" placeholder="20" />
                  </div>
                )}
                {sport === 'Football' && (
                  <div className="input-box">
                    <label>Half Duration (Minutes)</label>
                    <input type="number" placeholder="45" />
                  </div>
                )}
                <div className="input-box full-width">
                  <label>Tournament Instructions</label>
                  <textarea placeholder="Tell players about equipment, check-in times, etc." rows="4"></textarea>
                </div>
              </div>
              <div className="action-row">
                <button type="button" className="btn-secondary" onClick={prevStep}>Back</button>
                <button type="button" className="btn-primary" onClick={nextStep}>Next: Logistics</button>
              </div>
            </div>
          )}

          {/* STEP 3: LOGISTICS & CONTACT */}
          {step === 3 && (
            <div className="fade-in">
              <div className="form-section-title">Registration & Contact</div>
              
              <div className="fee-card">
                <div className="toggle-container">
                  <label className="switch">
                    <input type="checkbox" checked={isFree} onChange={() => setIsFree(!isFree)} />
                    <span className="slider round"></span>
                  </label>
                  <span>This event is free to join</span>
                </div>
                
                {!isFree && (
                  <div className="input-box fee-input active">
                    <label>Entry Fee (USD)</label>
                    <input type="number" placeholder="0.00" />
                  </div>
                )}
              </div>

              <div className="input-box">
                <label>Organizer Contact</label>
                <input type="text" placeholder="Email or Phone Number" required />
              </div>

              <div className="action-row">
                <button type="button" className="btn-secondary" onClick={prevStep}>Back</button>
                <button type="submit" className="btn-submit">Publish Tournament</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateTournament;