var router = require("express").Router();
var db = require('../models');

router.get("/", function(req, res) {
    db.Article.find({})
    .then(function(dbArticle) {
      res.render("index", { articles: dbArticle})
    })
    .catch(function(err) {
      res.json(err);
    })
});

// router.get("/saved", function(res, res) {
//   res.sendFile(path.join(__dirname, "../public/views/saved.html"));
// });

module.exports = router;