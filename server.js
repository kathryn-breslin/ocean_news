var express = require('express');
// var mongojs = require('mongojs');
var mongoose = require('mongoose');
var logger = require('morgan');
var axios = require('axios');
var cheerio = require('cheerio');
var exphbs = require("express-handlebars");



var PORT = process.env.PORT || 8080;
var app = express();

//Database connection
var db = require('./models');
mongoose.connect("mongodb://localhost/oceanDB", { useNewUrlParser: true });

//HTML Route
var routes = require("./routes/htmlRoutes.js");

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Connect Handlebars to our Express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(routes);

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

app.get("/articles/:id", function(req, res) {
  db.Article.findOne({ _id: req.params.id })
    .populate("comment")
    .then(function(adArticle) {
      res.json(adArticle)
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/articles/:id", function(req, res) {
  db.Comment.create(req.body)
  .then(function(dbComment){
    return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
  })
  .then(function(dbArticle) {
    res.json(dbArticle);
  })
  .catch(function(err) {
    res.json(err);
  });
});

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});