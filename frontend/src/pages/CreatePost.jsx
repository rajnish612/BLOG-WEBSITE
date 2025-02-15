import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import axios from 'axios';

const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
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
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag);

      await axios.post(
        'https://blog-website-1-rv8u.onrender.com/api/posts',
        { ...formData, tags: tagsArray },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 12, mb: 4 }}>
      <Paper 
        elevation={0}
        sx={{ 
          p: 4,
          background: 'rgba(18, 18, 18, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2
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
            mb: 4
          }}
        >
          Create New Post
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            name="title"
            label="Title"
            required
            fullWidth
            value={formData.title}
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
            name="content"
            label="Content"
            required
            fullWidth
            multiline
            rows={8}
            value={formData.content}
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
            name="tags"
            label="Tags (comma-separated)"
            fullWidth
            value={formData.tags}
            onChange={handleChange}
            disabled={loading}
            sx={{ mb: 4 }}
            placeholder="technology, programming, web development"
            helperText="Separate tags with commas"
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
            startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
            sx={{
              py: 1.5,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
              },
            }}
          >
            {loading ? 'Creating...' : 'Create Post'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreatePost;
