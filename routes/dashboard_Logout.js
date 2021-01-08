const router = require("express").Router();

// URL: ~/logout
router.all("/", (req, res, next) => {
  if (req.isAuthenticated()) {
    req.logOut();
    res.clearCookie(`connect.sid`);
  }
  res.redirect("/dashboard/login");
});

module.exports = router;
