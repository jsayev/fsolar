const { isAuthenticated } = require("../passport");
const uploader = require("../multer-uploadmw/uploader");
const Sponsor = require("../db/controller-mw/Sponsor");
const render = require("../render/makeRenderOpts")("Sponsors");
const makePaginationLinks = require("../render/helpers/paginationLinksMaker");

const router = require("express").Router();

// URL: ~/dashboard/sponsors
router.get("/", isAuthenticated, Sponsor.getInitial, (req, res, next) => {
  const { sponsors, sponsorCount, types } = res.locals;
  const renderRemoveSponsorJS = sponsors.length > 0 ? true : false;

  res.render(render.view, {
    ...render.options,
    username: req.user.username,
    sponsors,
    types,
    renderCreateSponsorJS: true,
    renderRemoveSponsorJS,
    paginationLinks: makePaginationLinks("/dashboard/sponsors", sponsorCount, 10, 1),
  });
});

// URL: ~/dashboard/sponsors/:page
router.get("/:page", isAuthenticated, Sponsor.getPartition, (req, res, next) => {
  const { sponsors, sponsorCount, types } = res.locals;
  const renderRemoveSponsorJS = sponsors.length > 0 ? true : false;

  res.render(render.view, {
    ...render.options,
    username: req.user.username,
    sponsors,
    types,
    renderCreateSponsorJS: true,
    renderRemoveSponsorJS,
    paginationLinks: makePaginationLinks("/dashboard/sponsors", sponsorCount, 10, req.params.page),
  });
});

// URL: ~/dashboard/sponsors
router.post("/", isAuthenticated, uploader.for("sponsorLogo"), Sponsor.addNew);

// URL: ~/dashboard/sponsors/:id
router.delete("/:id", isAuthenticated, Sponsor.remove);

module.exports = router;
