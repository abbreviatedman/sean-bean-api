require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cloudinary from 'cloudinary';

import router from './router';

const app = express();
const logger = morgan('combined');
const port = process.env.PORT || 3000;

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

mongoose.connect('mongodb://localhost/movies');

app.use(logger);
app.use('/v1', router);

app.get('/', (req, res) => {
  const url = cloudinary.url('thefield');
  res.send(url);
});

const server = app.listen(port, () => {
  const {address} = server.address();
  console.log(`Listening at http://${address}:${port}`);
});
