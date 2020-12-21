const render = require("../render/dashboardSummits");
const isAuthenticated = require("../passport").isAuthenticated;
const Summit = require("../db/controller-mw/Summit");

const router = require("express").Router();
// URL: ~/dashboard/summits
router.get("/", isAuthenticated, (req, res, next) => {
  res.render(render.view, { ...render.options, username: req.user.username });
});

// URL: ~/dashboard/summits
router.post("/", isAuthenticated, Summit.create);

// URL: ~/dashboard/summits
router.delete("/:id", isAuthenticated, Summit.deleteOne);

module.exports = router;
