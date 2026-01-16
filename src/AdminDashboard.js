import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = ({ tournaments, onApprove, onReject }) => {
  return (
    <div className="admin-wrapper">
      <header className="admin-header">
        <h1>Management Console</h1>
        <p>Review, verify, or remove tournaments from the system.</p>
      </header>

      <div className="admin-table-container">
        {tournaments.length === 0 ? (
          <p className="no-pending">No tournaments found.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Sport</th>
                <th>Date</th>
                <th>Status</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tournaments.map((t) => (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>{t.sport}</td>
                  <td>{t.date || 'TBD'}</td>
                  <td><span className={`status-badge ${t.status}`}>{t.status}</span></td>
                  <td style={{ fontWeight: '600', color: '#2563eb' }}>{t.contact || 'N/A'}</td>
                  <td>
                    {t.status === 'pending' && (
                      <button className="approve-btn" onClick={() => onApprove(t.id)}>Approve</button>
                    )}
                    <button className="reject-btn" onClick={() => onReject(t.id)}>
                      {t.status === 'live' ? 'Delete' : 'Reject'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;