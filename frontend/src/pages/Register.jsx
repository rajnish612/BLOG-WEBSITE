import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Alert,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post('https://blog-website-wgs9.onrender.com/api/auth/register', formData);
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 12, mb: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          background: 'rgba(18, 18, 18, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            textAlign: 'center',
            mb: 4,
          }}
        >
          Create your account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            name="username"
            label="Username"
            type="text"
            required
            fullWidth
            value={formData.username}
            onChange={handleChange}
            disabled={loading}
            sx={{ mb: 3 }}
            InputProps={{
              sx: {
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />

          <TextField
            name="email"
            label="Email"
            type="email"
            required
            fullWidth
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            sx={{ mb: 3 }}
            InputProps={{
              sx: {
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            required
            fullWidth
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            sx={{ mb: 4 }}
            InputProps={{
              sx: {
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <PersonAddIcon />}
            sx={{
              py: 1.5,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
              },
            }}
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>

          <Box sx={{ my: 3 }}>
            <Divider>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
          >
            Already have an account?{' '}
            <Link
              to="/login"
              style={{
                color: '#4a90e2',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              Login here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/auth/register', formData);
//       navigate('/login');
//     } catch (error) {
//       setError(error.response?.data?.message || 'An error occurred');
//     }
//   };

//   return (
//     <div className="container">
//       <div className="form-container">
//         <h2 className="form-title">Create your account</h2>
//         <form onSubmit={handleSubmit}>
//           {error && (
//             <div className="form-error">{error}</div>
//           )}
//           <div className="form-group">
//             <label htmlFor="username" className="form-label">Username</label>
//             <input
//               id="username"
//               name="username"
//               type="text"
//               required
//               className="form-input"
//               value={formData.username}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email" className="form-label">Email address</label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               required
//               className="form-input"
//               value={formData.email}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password" className="form-label">Password</label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               required
//               className="form-input"
//               value={formData.password}
//               onChange={handleChange}
//             />
//           </div>
//           <button type="submit" className="btn btn-primary btn-full">
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;
