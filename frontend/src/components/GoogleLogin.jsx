import React from 'react';

const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'https://blog-website-wgs9.onrender.com/api/auth/google';
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="google-btn"
      type="button"
    >
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
        alt="Google logo" 
        className="google-icon"
      />
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;
