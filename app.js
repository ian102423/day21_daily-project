const express = require("express");
const app = express();
const port = 8080;
const mustacheExpress = require("mustache-express");
const data = require("./data.js");

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static("./public"));

app.get("/", function(req, res) {
  res.render("index", data);
});

// app.get("/users/", function(req, res){
//     res.render("users", data)
// })


app.listen(port, function(req, res) {
  console.log("You are on the PORT: " + port + "...");
});
