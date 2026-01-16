import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
  e.preventDefault();
  const email = e.target[0].value;
  
  if (email === "admin@winner.com") {
    onLogin('admin'); // Set role to admin
    navigate('/admin/dashboard');
  } else {
    onLogin('user'); // Set role to user
    navigate('/selection');
  }
};
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <form className="auth-form" onSubmit={handleLogin}>
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="auth-submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;