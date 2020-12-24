const login = require("../passport").login;
const render = require("../render/login");
const router = require("express").Router();

// URL: ~/dashboard/login
router.get("/", (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.render(render.view, {
      ...render.options,
    });
  }
  res.redirect("/dashboard/summits");
});

//URL: ~/dashboard/login
router.post("/", login);

module.exports = router;
