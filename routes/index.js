const express = require("express");
const router = express.Router();

// URL: ~/
router.get("/", (req, res, next) => {
  res.render("index", { title: "Future-Solar Home" });
});

module.exports = router;
