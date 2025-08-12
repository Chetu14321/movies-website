import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth'; // import your auth hook
import MovieCard from './MovieCard';
import './Home.css';
import { toast } from 'react-toastify';

const logos = [
  '/logos/logo1.png',
  '/logos/logo2.png',
  '/logos/logo3.png',
  '/logos/logo4.png',
  '/logos/logo5.png',
];

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { isLogin } = useAuth(); // check auth
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/movies/getall')
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchTerm, movies]);

  const handleMovieClick = (movieId) => {
    if (isLogin) {
      navigate(`/movies/${movieId}`);
    } else {
      toast.success("login first to Watch the Movie")
      navigate('/login');
    }
  };

  return (
    <Box sx={{ backgroundColor: '#111', color: '#fff', minHeight: '100vh', px: 3, py: 4, mt: 7 }}>
      {/* Title and Search Box */}
      <Box
        sx={{
          border: '1px solid white',
          borderRadius: 2,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
          mb: 5,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          🎬 Kannada Movies
        </Typography>

        <TextField
          variant="outlined"
          placeholder="🔍 Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            flex: '1 1 300px',
            input: {
              backgroundColor: '#bdb67dff',
              color: '#fff',
              px: 2,
              py: 1,
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'black',
              },
            },
          }}
        />
      </Box>

      {/* Loading / Movie Grid */}
      {loading ? (
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <CircularProgress color="secondary" />
        </Box>
      ) : filteredMovies.length === 0 ? (
        <Typography variant="h6">No movies found matching your search.</Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={movie._id}>
              <Box
                sx={{ border: '1px solid white', borderRadius: 2 }}
                onClick={() => handleMovieClick(movie._id)}
                style={{ cursor: 'pointer' }}
              >
                <MovieCard movie={movie} />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Logo Marquee */}
      <Box sx={{ mt: 8, py: 3, backgroundColor: '#000' }}>
        <div className="marquee">
          <div className="marquee-content">
            {logos.concat(logos).map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt="Movie Logo"
                className="marquee-logo"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Home;
