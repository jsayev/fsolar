const Admin = require("../db/controller-mw/Admin");
const render = require("../render/makeRenderOpts")("Register");
const router = require("express").Router();

// URL: /dashboard/register
router.get("/", (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.render(render.view, {
      ...render.options,
    });
  }
  res.redirect("/dashboard/summit");
});

// URL: /dashboard/register
router.post("/", Admin.create);

module.exports = router;
