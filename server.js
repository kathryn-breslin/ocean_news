var express = require('express');
var mongojs = require('mongojs');
var logger = require('morgan');
var axios = require('axios');
var cheerio = require('cheerio');

var PORT = process.env.PORT || 8080;
var app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get('/scrape', function(req, res) {
  axios.get('https://www.oceannews.com/').then(function(response) {
    var $ = cheerio.load(response.data)

    $('.title').each(function(i, element) {
      var result = {};
      result.title = $(this).children('a').text();
      result.link = $(this).children('a').attr('href');

      console.log(result);
    })
  });
});

require("./routes/htmlRoutes.js")(app)

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});