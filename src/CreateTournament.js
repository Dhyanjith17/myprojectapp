import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateTournament.css';

const CreateTournament = ({ onAdd }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [sport, setSport] = useState('');
  const [isFree, setIsFree] = useState(false);
  
  const [tournamentName, setTournamentName] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [date, setDate] = useState('');
  const [instructions, setInstructions] = useState('');
  const [fee, setFee] = useState(0);

  // New states for sport-specific rules
  const [overs, setOvers] = useState('');
  const [duration, setDuration] = useState('');
  const [quarters, setQuarters] = useState('');

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    onAdd({
      name: tournamentName,
      sport: sport,
      location: location,
      contact: contact,
      date: date,
      instructions: instructions,
      fee: isFree ? 0 : fee,
      isFree: isFree,
      // Passing sport-specific rules
      overs: overs,
      duration: duration,
      quarters: quarters
    });

    alert('Tournament submitted! Awaiting Admin Approval.');
    navigate('/selection'); 
  };

  return (
    <div className="create-page-wrapper">
      <div className="stepper-container">
        <div className={`step-item ${step >= 1 ? 'active' : ''}`}><div className="step-number">1</div><span>Essentials</span></div>
        <div className="step-line"></div>
        <div className={`step-item ${step >= 2 ? 'active' : ''}`}><div className="step-number">2</div><span>Sport Rules</span></div>
        <div className="step-line"></div>
        <div className={`step-item ${step === 3 ? 'active' : ''}`}><div className="step-number">3</div><span>Publish</span></div>
      </div>

      <div className="main-form-card">
        <form onSubmit={handleSubmit}>
          {/* STEP 1 */}
          {step === 1 && (
            <div className="fade-in">
              <div className="form-section-title">General Info</div>
              <div className="form-grid">
                <div className="input-box">
                  <label>Tournament Name</label>
                  <input type="text" placeholder="e.g. National Open" value={tournamentName} onChange={(e) => setTournamentName(e.target.value)} required />
                </div>
                <div className="input-box">
                  <label>Start Date</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div className="input-box full-width">
                  <label>Venue / Location</label>
                  <input type="text" placeholder="Enter stadium" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </div>
              </div>

              <div className="form-section-title">Discipline</div>
              <div className="sport-selector">
                {['Cricket', 'Football', 'Basketball', 'Volleyball'].map((s) => (
                  <div key={s} className={`sport-option ${sport === s ? 'selected' : ''}`} onClick={() => setSport(s)}>
                    <span className="sport-icon">{s[0]}</span>{s}
                  </div>
                ))}
              </div>
              <div className="action-row">
                <button type="button" className="btn-primary" onClick={nextStep} disabled={!sport || !tournamentName || !location || !date}>Continue</button>
              </div>
            </div>
          )}

          {/* STEP 2: RESTORED SPORT RULES */}
          {step === 2 && (
            <div className="fade-in">
              <div className="form-section-title">{sport} Configuration</div>
              <div className="adaptive-card">
                {sport === 'Cricket' && (
                  <div className="input-box">
                    <label>Overs per Inning</label>
                    <input type="number" placeholder="20" value={overs} onChange={(e) => setOvers(e.target.value)} />
                  </div>
                )}
                {sport === 'Football' && (
                  <div className="input-box">
                    <label>Half Duration (Minutes)</label>
                    <input type="number" placeholder="45" value={duration} onChange={(e) => setDuration(e.target.value)} />
                  </div>
                )}
                {(sport === 'Basketball' || sport === 'Volleyball') && (
                  <div className="input-box">
                    <label>Number of Quarters/Sets</label>
                    <input type="number" placeholder="4" value={quarters} onChange={(e) => setQuarters(e.target.value)} />
                  </div>
                )}
                <div className="input-box full-width">
                  <label>Instructions</label>
                  <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Equipment, check-in times..." rows="4"></textarea>
                </div>
              </div>
              <div className="action-row">
                <button type="button" className="btn-secondary" onClick={prevStep}>Back</button>
                <button type="button" className="btn-primary" onClick={nextStep}>Next: Logistics</button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
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
                    <input type="number" value={fee} onChange={(e) => setFee(e.target.value)} />
                  </div>
                )}
              </div>
              <div className="input-box">
                <label>Organizer Contact</label>
                <input type="text" placeholder="Email or Phone" value={contact} onChange={(e) => setContact(e.target.value)} required />
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