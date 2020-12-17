const render = require("../render/dashboardSummits");
const isAuthenticated = require("../passport").isAuthenticated;

const router = require("express").Router();
// URL: ~/dashboard/summits
router.get("/", isAuthenticated, (req, res, next) => {
  res.render(render.view, { ...render.options, username: req.user.username });
});

module.exports = router;
