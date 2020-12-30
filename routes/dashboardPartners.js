const { isAuthenticated } = require("../passport");
const uploader = require("../multer-uploadmw/uploader");
const Partner = require("../db/controller-mw/Partner");
const render = require("../render/makeRenderOpts")("Partners");
const makePaginationLinks = require("../render/helpers/paginationLinksMaker");

const router = require("express").Router();

// URL: ~/dashboard/partners
router.get("/", isAuthenticated, Partner.getInitial, (req, res, next) => {
  const { partners, partnerCount } = res.locals;
  const renderRemovePartnerJS = partners.length > 0 ? true : false;

  res.render(render.view, {
    ...render.options,
    username: req.user.username,
    partners,
    renderCreatePartnerJS: true,
    renderRemovePartnerJS,
    paginationLinks: makePaginationLinks("/dashboard/partners", partnerCount, 10, 1),
  });
});

// URL: ~/dashboard/partners/:page
router.get("/:page", isAuthenticated, Partner.getPartition, (req, res, next) => {
  const { partners, partnerCount } = res.locals;
  const renderRemovePartnerJS = partners.length > 0 ? true : false;

  res.render(render.view, {
    ...render.options,
    username: req.user.username,
    partners,
    renderCreatePartnerJS: true,
    renderRemovePartnerJS,
    paginationLinks: makePaginationLinks("/dashboard/partners", partnerCount, 10, req.params.page),
  });
});

// URL: ~/dashboard/partners
router.post("/", isAuthenticated, uploader.for("partnerLogo"), Partner.addNew);

// URL: ~/dashboard/partners/:id
router.delete("/:id", isAuthenticated, Partner.remove);

module.exports = router;
