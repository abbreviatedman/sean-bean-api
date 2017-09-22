import mongoose from 'mongoose';

import Movie from './models/movie';

const movies = [
  {
    title: 'The Field',
    cloudinaryName: 'thefield',
    year: 1990,
    dies: true,
  }
];

mongoose.connect('mongodb://localhost/movies');

movies.forEach(movie => {
  const entry = new Movie(movie);
  entry.save();
});
