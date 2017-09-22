// require('dotenv').config();
// import express from 'express';
// import morgan from 'morgan';
// import mongoose from 'mongoose';
// import cloudinary from 'cloudinary';

// import router from './router';

// const app = express();
// const logger = morgan('combined');
// const port = process.env.PORT || 3000;

// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// mongoose.connect('mongodb://localhost/movies');

// app.use(logger);
// app.use('/v1', router);

// app.get('/', (req, res) => {
//   const url = cloudinary.url('thefield');
//   res.send(url);
// });

// const server = app.listen(port, () => {
//   const {address} = server.address();
//   console.log(`Listening at http://${address}:${port}`);
// });


import express from 'express';
import morgan from 'morgan';
import cloudinary from 'cloudinary';
import bodyParser from 'body-parser';
import mongodb from 'mongodb';

const {ObjectID, MongoClient} = mongodb;
const app = express();

const MOVIE_COLLECTION = "movies";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(bodyParser.json());

let db;

MongoClient.connect(process.env.MONGODB_URI, (err, database) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  db = database;
  console.log('Database ready!');
  const server = app.listen(process.env.PORT || 3000, () => {
    const {port} = server.address();
    console.log(`Server running on port ${port}!`)
  });
});

const handleError = (res, reason, message, code) => {
  console.error(`ERROR: ${reason}`);
  res.status(code || 500).json({'error': message});
};

app.get('/api/movies', (req, res) => {
  db.collection(MOVIE_COLLECTION).find({}).toArray((err, documents) => {
    if (err) {
      handleError(res, err.message, "Failed to get movie data from database.");
    } else {
      res.status(200, json(documents))
    }
  });
});