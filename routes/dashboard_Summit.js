const render = require("../render/makeRenderOpts")("Summit");
const { isAuthenticated } = require("../passport");
const Summit = require("../db/controller-mw/Summit");
const uploader = require("../multer-uploadmw/uploader");
const dateformat = require("dateformat");
const router = require("express").Router();

// URL: ~/dashboard/summit
router.get("/", isAuthenticated, Summit.pickAll, (req, res, next) => {
  const { summit, summitFiles } = res.locals;
  const renderCreateSummitJS = !summit;
  const renderRemoveSummitJS = !renderCreateSummitJS;
  
  if (summit) {
    summit.date = dateformat(summit.date, "d mmm yyyy");
    summit.summitFiles = summitFiles;
  }

  res.render(render.view, { ...render.options, summit, renderCreateSummitJS, renderRemoveSummitJS, username: req.user.username });
});

// URL: ~/dashboard/summit
router.post("/", isAuthenticated, uploader.for("summitBgFiles"), Summit.create);

// URL: ~/dashboard/summit
router.delete("/", isAuthenticated, Summit.delete);

module.exports = router;
