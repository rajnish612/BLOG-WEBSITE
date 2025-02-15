

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useTheme,
  Container,
} from '@mui/material';
import {
  Create as CreateIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isAuthenticated = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      {/* Website credit above navbar */}
   

      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'rgba(18, 18, 18, 0.9)',
        
          backdropFilter: 'blur(10px)',
          
        }}
      >
        
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold',
              '&:hover': {
                color: theme.palette.primary.main,
              },
            }}
          >
            BlogAI
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/"
              color="inherit"
              sx={{
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              }}
            >
              Home
            </Button>

            {isAuthenticated ? (
              <>
                <Button
                  component={Link}
                  to="/create-post"
                  color="primary"
                  variant="contained"
                  startIcon={<CreateIcon />}
                  sx={{
                    '&:hover': {
                      background: theme.palette.primary.dark,
                    },
                  }}
                >
                  Create Post
                </Button>
                <IconButton
                  color="inherit"
                  onClick={handleLogout}
                  sx={{
                    '&:hover': {
                      color: theme.palette.error.main,
                    },
                  }}
                >
                  <LogoutIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  color="primary"
                  variant="outlined"
                  startIcon={<LoginIcon />}
                  sx={{
                    borderColor: theme.palette.primary.main,
                    '&:hover': {
                      borderColor: theme.palette.primary.dark,
                      background: 'rgba(74, 144, 226, 0.1)',
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  color="secondary"
                  variant="contained"
                  startIcon={<PersonAddIcon />}
                  sx={{
                    '&:hover': {
                      background: theme.palette.secondary.dark,
                    },
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
        <Box
        sx={{
          backgroundColor: 'rgba(18, 18, 18, 0.9)',
          padding: '10px 0',
          textAlign: 'center',
          color: 'white',
         
        }}
      >
        <Container>
          <Typography variant="body2">
            This website is created by Rajnish Nath | Email: <a href="mailto:rnish612@gmail.com" style={{ color: theme.palette.primary.main }}>rnish612@gmail.com</a>
          </Typography>
        </Container>
      </Box>
      </AppBar>
    </>
  );
};

export default Navbar;