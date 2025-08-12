const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.post('/add', movieController.addMovie);
router.get('/getall', movieController.getAllMovies);
router.get('/:movieId', movieController.getMovieById);
router.delete('/:movieId', movieController.deleteMovie);
router.get('/count/total', movieController.getMovieCount);

module.exports = router;
