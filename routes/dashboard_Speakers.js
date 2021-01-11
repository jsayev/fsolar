const { isAuthenticated } = require("../passport");
const uploader = require("../multer-uploadmw/uploader");
const Speaker = require("../db/controller-mw/Speaker");
const render = require("../render/makeRenderOpts")("Speakers");
const makePaginationLinks = require("../render/helpers/paginationLinksMaker");

const router = require("express").Router();

// URL: ~/dashboard/speakers
router.get("/", isAuthenticated, Speaker.getInitial, (req, res, next) => {
  const { speakers, speakerCount } = res.locals;
  const renderRemoveSpeakerJS = speakers.length > 0 ? true : false;

  res.render(render.view, {
    ...render.options,
    username: req.user.username,
    speakers,
    renderCreateSpeakerJS: true,
    renderRemoveSpeakerJS,
    paginationLinks: makePaginationLinks("/dashboard/speakers", speakerCount, 10, 1),
  });
});

// URL: ~/dashboard/speakers/dataconf
router.get("/dataconf", isAuthenticated, Speaker.getForConf);

// URL: ~/dashboard/speakers/:page
router.get("/:page", isAuthenticated, Speaker.getPartition, (req, res, next) => {
  const { speakers, speakerCount } = res.locals;
  const renderRemoveSpeakerJS = speakers.length > 0 ? true : false;

  res.render(render.view, {
    ...render.options,
    username: req.user.username,
    speakers,
    renderCreateSpeakerJS: true,
    renderRemoveSpeakerJS,
    paginationLinks: makePaginationLinks("/dashboard/speakers", speakerCount, 10, req.params.page),
  });
});

// URL: ~/dashboard/speakers
router.post("/", isAuthenticated, uploader.for("speakerFiles"), Speaker.addNew);

// URL: ~/dashboard/speakers/:id
router.delete("/:id", isAuthenticated, Speaker.remove);

module.exports = router;
