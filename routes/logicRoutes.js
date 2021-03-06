var router = require("express").Router();
var db = require('../models');
var axios = require('axios');
var cheerio = require('cheerio');

router.get('/', function(res, res) {
    db.Article.find().sort({ _id: -1 })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      })
  })
  
  router.get("/clear", function(req, res) {
    db.Article.remove({})
        .then(function() {
          return db.Comment.remove({});
        })
        .then(function() {
          res.redirect("/");
        })
  });

  router.get('/scrape', function(req, res) {
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
      res.redirect("/");
    });
    
  });
  
  router.get("/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
      .populate("comment")
      .then(function(adArticle) {
        res.json(adArticle)
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  
  //For Saved feature - future implementation
  
  // router.put("/:id", function(req, res) {
  //   db.Article.findOneAndUpdate({ _id: req.params.id })
  //     .populate("saved")
  //     .then(function(adArticle) {
  //       res.json(adArticle)
  //     })
  //     .catch(function(err) {
  //       res.json(err);
  //     });
  // });
  
  router.post("/:id", function(req, res) {
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

  module.exports = router;