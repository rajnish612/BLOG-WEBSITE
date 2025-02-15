import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Login as LoginIcon,
  Google as GoogleIcon,
} from '@mui/icons-material';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      const response = await axios.post('https://blog-website-1-rv8u.onrender.com/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'https://blog-website-1-rv8u.onrender.com/api/auth/google';
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
          Welcome Back
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
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
            startIcon={loading ? <CircularProgress size={20} /> : <LoginIcon />}
            sx={{
              py: 1.5,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
              },
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          <Box sx={{ my: 3 }}>
            <Divider>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>
          </Box>

          <Button
            variant="outlined"
            color="primary"
            fullWidth
            size="large"
            onClick={handleGoogleLogin}
            startIcon={<GoogleIcon />}
            sx={{
              py: 1.5,
              mb: 3,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                borderColor: 'primary.main',
                backgroundColor: 'rgba(74, 144, 226, 0.1)',
              },
            }}
          >
            Continue with Google
          </Button>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
          >
            Don't have an account?{' '}
            <Link
              to="/register"
              style={{
                color: '#4a90e2',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              Register here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
