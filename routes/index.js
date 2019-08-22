var router = require("express").Router();
var logicRoutes = require("./logicRoutes");
var htmlRoutes = require("./htmlRoutes");

router.use("/articles", logicRoutes);
router.use("/", htmlRoutes);

module.exports = router;