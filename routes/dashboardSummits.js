const render = require("../render/dashboardSummits");
const isAuthenticated = require("../passport").isAuthenticated;
const Summit = require("../db/controller-mw/Summit");
const uploader = require("../mwares/uploader");

const router = require("express").Router();
// URL: ~/dashboard/summits
router.get("/", isAuthenticated, Summit.pickAll, (req, res, next) => {
  const summit = res.locals.summit;
  const renderCreateSummitJS = !summit;
  const renderRemoveSummitJS = !renderCreateSummitJS;

  res.render(render.view, { ...render.options, summit, renderCreateSummitJS, renderRemoveSummitJS, username: req.user.username });
});

// URL: ~/dashboard/summits
router.post("/", isAuthenticated, uploader.array("files"), Summit.create);

// URL: ~/dashboard/summits
router.delete("/:id", isAuthenticated, Summit.deleteOne);

module.exports = router;
