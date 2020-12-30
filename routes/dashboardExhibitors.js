const { isAuthenticated } = require("../passport");
const uploader = require("../multer-uploadmw/uploader");
const Exhibitor = require("../db/controller-mw/Exhibitor");
const render = require("../render/makeRenderOpts")("Exhibitors");
const makePaginationLinks = require("../render/helpers/paginationLinksMaker");

const router = require("express").Router();

// URL: ~/dashboard/exhibitors
router.get("/", isAuthenticated, Exhibitor.getInitial, (req, res, next) => {
  const { exhibitors, exhibitorCount } = res.locals;
  const renderRemoveExhibitorJS = exhibitors.length > 0 ? true : false;

  res.render(render.view, {
    ...render.options,
    username: req.user.username,
    exhibitors,
    renderCreateExhibitorJS: true,
    renderRemoveExhibitorJS,
    paginationLinks: makePaginationLinks("/dashboard/exhibitors", exhibitorCount, 10, 1),
  });
});

// URL: ~/dashboard/exhibitors/:page
router.get("/:page", isAuthenticated, Exhibitor.getPartition, (req, res, next) => {
  const { exhibitors, exhibitorCount } = res.locals;
  const renderRemoveExhibitorJS = exhibitors.length > 0 ? true : false;

  res.render(render.view, {
    ...render.options,
    username: req.user.username,
    exhibitors,
    renderCreateExhibitorJS: true,
    renderRemoveExhibitorJS,
    paginationLinks: makePaginationLinks("/dashboard/exhibitors", exhibitorCount, 10, req.params.page),
  });
});

// URL: ~/dashboard/exhibitors
router.post("/", isAuthenticated, uploader.for("exhibitorLogo"), Exhibitor.addNew);

// URL: ~/dashboard/exhibitors/:id
router.delete("/:id", isAuthenticated, Exhibitor.remove);

module.exports = router;
