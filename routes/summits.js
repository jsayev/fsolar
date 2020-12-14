const render = require("../render/dashboard");
const isAuthenticated = require("../passport").isAuthenticated;

const router = require("express").Router();
// URL: ~/dashboard
router.get("/", isAuthenticated(), (req, res, next) => {
  res.render(render.view, { ...render.options, username: req.user.username });
});

module.exports = router;
