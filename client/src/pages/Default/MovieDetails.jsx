import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Grid,
} from '@mui/material';
import VideoPlayer from './videoPlayes';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(`/api/movies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch movie:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (!movie) {
    return <Typography>Movie not found.</Typography>;
  }

  const videoUrl = movie.videoUrl;

  return (
    <Box sx={{ backgroundColor: '#111', color: '#fff', minHeight: '100vh', p: 4, mt: 7 }}>
      <Link to="/">
        <Button variant="outlined" sx={{ mb: 3, color: '#fff', borderColor: '#fff' }}>
          ← Back
        </Button>
      </Link>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {movie.title}
          </Typography>

          <img
            src={movie.thumbnailUrl}
            alt={movie.title}
            style={{
              width: '100%',
              maxWidth: '400px',
              borderRadius: '12px',
              marginBottom: '1rem',
            }}
          />

          <Typography variant="h6">Genre: {movie.genre}</Typography>
          <Typography variant="body1" mt={2}>
            {movie.description}
          </Typography>
        </Grid>

   {movie.videoUrl ? (
  <VideoPlayer src={movie.videoUrl} />
) : (
  <Typography>No video available.</Typography>
)}
      </Grid>
    </Box>
  );
};

export default MovieDetails;
