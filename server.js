var express = require('express');
var mongojs = require('mongojs');
var logger = require('morgan');
var path = require('path');
var PORT = process.env.PORT || 8080;
var app = express();

app.use(logger('dev'));
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


require("./routes/htmlRoutes.js")(app)

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});