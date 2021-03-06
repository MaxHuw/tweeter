"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const sassMiddleware = require("node-sass-middleware");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  sassMiddleware({
    /* Options */
    src: path.join(__dirname, "styles"),
    dest: path.join(__dirname, "public", "styles"),
    debug: true,
    outputStyle: "expanded",
    prefix: "/styles" // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
  })
);

MongoClient.connect(MONGODB_URI, (err, db) => {

  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  const DataHelpers = require("./lib/data-helpers.js")(db);
  // The `data-helpers` module provides an interface to the database of tweets.
  // This simple interface layer has a big benefit: we could switch out the
  // actual database it uses and see little to no changes elsewhere in the code
  //
  // Because it exports a function that expects the `db` as a parameter, we can
  // require it and pass the `db` parameter immediately:


  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
  // so it can define routes that use it to interact with the data layer.

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);

});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
