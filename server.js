var express = require('express');
var mongojs = require('mongojs');
var logger = require('morgan');
var axios = require('axios');
var cheerio = require('cheerio');


var PORT = process.env.PORT || 8080;
var app = express();

//Database connection
var databaseUrl = "oceanDB";
var collections = ["scrapedData"];

//Mongojs configuration
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error: " + error);
});

//HTML Route
require("./routes/htmlRoutes.js")(app)

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get('/articles', function(res, res) {
  db.scrapedData.find({}, function(error, data) {
    if (error) {
      console.log("Error: " + error);
    }
    else {
      res.json(data);
    }
  })
})

app.get('/scrape', function(req, res) {
  axios.get('https://www.oceannews.com/').then(function(response) {
    var $ = cheerio.load(response.data)

    $('li.articlelist-item').each(function(i, element) {
      // var results = [];
      var title = $(element).find("a").text();
      var link = $(element).find("a").attr('href');
      var image = $(element).find("a").find("img").attr("src");
      if (title && link) {
        db.scrapedData.insert({
          title: title,
          image: image,
          link: link
        }, 
        function(err, inserted) {
          if (err) {
            console.log(err);
          }
          else {
            console.log(inserted);
          }
        });      
      }
    })
  });
});

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});