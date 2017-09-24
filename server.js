const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;

const MOVIES_COLLECTION = "movies";

const app = express();
app.use(bodyParser.json());

let db;

mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  const server = app.listen(process.env.PORT || 8080, function () {
    const port = server.address().port;
    console.log("App now running on port", port);
  });
});

// movies API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/movies"
 *    GET: finds all movies
 *    POST: creates a new contact
 */

app.get("/api/movies", function(req, res) {
  db.collection(MOVIES_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get movies.");
    } else {
      // transformedDocs = docs.map(addCloudinaryUrl)
      res.status(200).json(docs);
    }
  });
});

// app.post("/api/movies", function(req, res) {
//   var newMovie = req.body;

//   db.collection(MOVIES_COLLECTION).insertOne(newMovie, function(err, doc) {
//     if (err) {
//       handleError(res, err.message, "Failed to create new movie.");
//     } else {
//       res.status(201).json(doc.ops[0]);
//     }
//   });
// });



// curl -H "Content-Type: application/json" -d '{"name":"mLab Support", "email": "support@mlab.com"}' http://anothermlabtest.herokuapp.com/api/movies