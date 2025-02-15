import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Chip,
  CircularProgress,
  Box,
} from '@mui/material';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://blog-website-wgs9.onrender.com/api/posts');
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: 'primary.main',
          textAlign: 'center',
          mb: 6,
        }}
      >
        Latest Blog Posts
      </Typography>
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item xs={12} md={6} key={post._id}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    src={post.author?.profilePicture}
                    alt={post.author?.username}
                  >
                    {post.author?.username?.[0]?.toUpperCase() || 'U'}
                  </Avatar>
                }
                title={post.author?.username || 'Unknown'}
                subheader={new Date(post.createdAt).toLocaleDateString()}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    color: 'primary.main',
                  }}
                >
                  {post.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  paragraph
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {post.content}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {post.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(74, 144, 226, 0.1)',
                        },
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {posts.length === 0 && (
          <Grid item xs={12}>
            <Typography
              variant="h6"
              color="text.secondary"
              align="center"
              sx={{ mt: 4 }}
            >
              No posts found.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Home;
