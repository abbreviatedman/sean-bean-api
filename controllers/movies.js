import Movie from '../models/movie';

export const movieIndex = (req, res, next) => {
  Movie.find().lean().exec((err, movies) => res.json({movies}));
}
