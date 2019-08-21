var express = require('express');
// var mongojs = require('mongojs');
var mongoose = require('mongoose');
var logger = require('morgan');
var axios = require('axios');
var cheerio = require('cheerio');


var PORT = process.env.PORT || 8080;
var app = express();

//Database connection
var db = require('./models');
mongoose.connect("mongodb://localhost/oceanDB", { useNewUrlParser: true });

//HTML Route
require("./routes/htmlRoutes.js")(app)

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get('/articles', function(res, res) {
  db.Article.find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    })
})

app.get('/scrape', function(req, res) {
  axios.get('https://www.oceannews.com/').then(function(response) {
    var $ = cheerio.load(response.data)

    $('li.articlelist-item').each(function(i, element) {
      var results = {};
      results.title = $(element).find("a").text();
      results.link = $(element).find("a").attr('href');
      results.image = $(element).find("a").find("img").attr("src");

      db.Article.create(results).then(function(dbArticle) {
        console.log(dbArticle);
      })
      .catch(function(err) {
        console.log(err);
      })
    });
    res.send("Scrape Complete");
  });
  
});

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});