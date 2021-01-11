const render = require("../render/makeRenderOpts")("Password");
const { isAuthenticated } = require("../passport");
const Admin = require("../db/controller-mw/Admin");
const router = require("express").Router();

// URL: ~/dashboard/password
router.get("/", isAuthenticated, (req, res, next) => {
  const { username } = req.user;

  res.render(render.view, { ...render.options, username });
});

// URL: ~/dashboard/password
router.put("/", isAuthenticated, Admin.updatePassword);

module.exports = router;
