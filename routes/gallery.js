const router = require("express").Router();

// GET: ~/gallery
router.get("/all", (req, res, next) => {
  res.end("all gallery");
});

module.exports = router;
