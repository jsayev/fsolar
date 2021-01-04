const { isAuthenticated } = require("../passport");
const uploader = require("../multer-uploadmw/uploader");
const VirtualConference = require("../db/controller-mw/VirtualConference");
const render = require("../render/makeRenderOpts")("VirtualConferences");
const makePaginationLinks = require("../render/helpers/paginationLinksMaker");

const router = require("express").Router();

// URL: ~/dashboard/virtualconferences
router.get("/", isAuthenticated, VirtualConference.getInitial, (req, res, next) => {
  const { virtualConferences, virtualConferenceCount } = res.locals;
  const renderRemoveVirtualConferenceJS = virtualConferences.length > 0 ? true : false;

  res.render(render.view, {
    ...render.options,
    username: req.user.username,
    virtualConferences,
    renderCreateVirtualConferenceJS: true,
    renderRemoveVirtualConferenceJS,
    paginationLinks: makePaginationLinks("/dashboard/virtualconferences", virtualConferenceCount, 10, 1),
  });
});

// URL: ~/dashboard/virtualconferences/:page
router.get("/:page", isAuthenticated, VirtualConference.getPartition, (req, res, next) => {
  const { virtualConferences, virtualConferenceCount } = res.locals;
  const renderRemoveVirtualConferenceJS = virtualConferences.length > 0 ? true : false;

  res.render(render.view, {
    ...render.options,
    username: req.user.username,
    virtualConferences,
    renderCreateVirtualConferenceJS: true,
    renderRemoveVirtualConferenceJS,
    paginationLinks: makePaginationLinks("/dashboard/virtualconferences", virtualConferenceCount, 10, req.params.page),
  });
});

// URL: ~/dashboard/virtualconferences:id
router.get("/get/:id", isAuthenticated, VirtualConference.getOne);

// URL: ~/dashboard/virtualconferences
router.post("/", isAuthenticated, uploader.for("virtualConferenceBg"), VirtualConference.addNew);

// URL: ~/dashboard/virtualconferences/:id
router.delete("/:id", isAuthenticated, VirtualConference.remove);

module.exports = router;
