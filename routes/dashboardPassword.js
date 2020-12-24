const render = require("../render/dashboardPassword");
const isAuthenticated = require("../passport").isAuthenticated;
const Admin = require("../db/controller-mw/Admin");
const router = require("express").Router();

// URL: ~/dashboard/password
router.get("/", isAuthenticated, (req, res, next) => {
  res.render(render.view, { ...render.options, username: req.user.username });
});

// URL: ~/dashboard/password
router.put("/", isAuthenticated, Admin.updatePassword);

module.exports = router;
