var express = require('express');
var mongoose = require('mongoose');
var exphbs = require("express-handlebars");
var favicon = require('serve-favicon');

var PORT = process.env.PORT || 8080;
var app = express();
//HTML Route
var routes = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(routes);

//Database connection
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/oceanDB";

mongoose.connect(MONGODB_URI);

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});