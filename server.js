const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;
const cloudinary = require('cloudinary');
require('dotenv').config()

const MOVIES_COLLECTION = "movies";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
app.use(bodyParser.json());

let db;

const mongoDbUri = process.env.MONGODB_URI || 'mongodb://localhost/movies';

mongodb.MongoClient.connect(mongoDbUri, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = database;
  console.log("Database connection ready");

  const server = app.listen(process.env.PORT || 8080, function () {
    const port = server.address().port;
    console.log("App now running on port", port);
  });
});

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

function addCloudinaryHtml(doc) {
  const html = cloudinary.video(doc.cloudinaryName);
  doc.html = html;
}

app.get("/api/movies", function(req, res) {
  db.collection(MOVIES_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get movies.");
    } else {
      docs.forEach(addCloudinaryUrl);
      res.status(200).json(docs);
    }
  });
});
