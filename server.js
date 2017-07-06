const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const port = process.env.PORT || 8080;
const mongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const path = require("path");
const dbUrl = "mongodb://localhost:27017/robotdb";

let DB;
let ROBOTDBRO;
var userData = require("./data.js");

// SET VIEW ENGINE
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");
app.use(express.static("./public"));

// mongodb
mongoClient.connect(dbUrl, function(err, db) {
  if (err) {
    console.warn("Error", err);
  }
  DB = db;
  ROBOTDBRO = db.collection("robots");
});

app.get("/", (req, res) => {
  ROBOTDBRO.find({}).toArray(function(err, foundRobots) {
    if (err) {
      console.warn("Error", err);
    }
    res.render("index", { robots: foundRobots });
  });
});

app.get("/:id", (req, res) => {
  ROBOTDBRO.findOne({ id: parseInt(req.params.id) }, function(err, foundRobot) {
    if (err) {
      res.status(500).send(err);
    }
    res.render("detail", { robot: foundRobot });
  });
});

// LISTEN
app.listen(port, () => {
  console.log("You are on the PORT: " + port + "...");
});
