import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    
    if (token) {
      localStorage.setItem('token', token);
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [navigate, location]);

  return (
    <div className="auth-container">
      <h2>Authenticating...</h2>
    </div>
  );
};

export default AuthSuccess;
