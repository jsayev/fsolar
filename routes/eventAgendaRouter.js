const router = require("express").Router();

// URL: ~/eventagenda/:filename
router.get("/:filename", (req, res, next) => {
  res.download(`./public/uploads/eventAgenda/${req.params.filename}`, (err) => {
    if (err) next(`File doesn't exist!`);
  });
});

module.exports = router;
