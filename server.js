// import express from 'express';
// import morgan from 'morgan';
// import cloudinary from 'cloudinary';
// import bodyParser from 'body-parser';
// import mongodb from 'mongodb';

// const {ObjectID, MongoClient} = mongodb;
// const app = express();

// const MOVIE_COLLECTION = "movies";

// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// app.use(bodyParser.json());

// let db;
// MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
//   if (err) {
//     console.log(err);
//     process.exit(1);
//   }
  
//   db = database;
//   console.log("Database connection ready");

//   const server = app.listen(process.env.PORT || 8080, function () {
//     const port = server.address().port;
//     console.log("App now running on port", port);
//   });
// });

// const handleError = (res, reason, message, code) => {
//   console.error(`ERROR: ${reason}`);
//   res.status(code || 500).json({'error': message});
// };

// app.get('/api/movies', (req, res) => {
//   db.collection(MOVIE_COLLECTION).find({}).toArray((err, documents) => {
//     if (err) {
//       handleError(res, err.message, "Failed to get movie data from database.");
//     } else {
//       res.status(200, json(documents))
//     }
//   });
// });

// app.post("/api/movies", function(req, res) {
//   var newMovie = req.body;

//   db.collection(MOVIE_COLLECTION).insertOne(newMovie, function(err, doc) {
//     if (err) {
//       handleError(res, err.message, "Failed to add new movie to database.");
//     } else {
//       res.status(201).json(doc.ops[0]);
//     }
//   });
// });


// {"title": "The Field", "year": 1990, "cloudinaryName": "thefield", "dies": true}
// curl -H "Content-Type: application/json" -d "{'title': 'The Field', 'year': 1990, 'cloudinaryName': 'thefield', 'dies': true}" http://seanbeanapi.herokuapp.com/api/movies

import express from 'express';
import bodyParser from 'body-parser';
import mongodb from 'mongodb';

const MOVIES_COLLECTION = "movies";

const app = express();
app.use(bodyParser.json());

let db;

mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = database;
  console.log("Database connection ready");

  const server = app.listen(process.env.PORT || 8080, function () {
    const port = server.address().port;
    console.log('App now running on port: ' + port);
  });
});

function handleError(res, reason, message, code) {
  console.log('ERROR: ' + reason);
  res.status(code || 500).json({"error": message});
}


app.get("/api/movies", function(req, res) {
  db.collection(MOVIES_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get movies.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/movies", function(req, res) {
  const newMovie = req.body;

  db.collection(MOVIES_COLLECTION).insertOne(newMovie, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new movie.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});