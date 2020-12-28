const render = require("../render/dashboardSummits");
const { isAuthenticated } = require("../passport");
const Summit = require("../db/controller-mw/Summit");
const uploader = require("../multer-uploadmw/uploader");
const dateformat = require("dateformat");
const router = require("express").Router();

// URL: ~/dashboard/summits
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

// URL: ~/dashboard/summits
router.post("/", isAuthenticated, uploader.for("summitBgFiles"), Summit.create);

// URL: ~/dashboard/summits
router.delete("/", isAuthenticated, Summit.delete);

module.exports = router;
