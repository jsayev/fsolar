const { isAuthenticated } = require("../passport");
const uploader = require("../multer-uploadmw/uploader");
const SupportOrganization = require("../db/controller-mw/SupportOrganization");
const render = require("../render/makeRenderOpts")("SupportOrganizations");
const makePaginationLinks = require("../render/helpers/paginationLinksMaker");

const router = require("express").Router();

// URL: ~/dashboard/supportorganizations
router.get("/", isAuthenticated, SupportOrganization.getInitial, (req, res, next) => {
  const { supportOrganizations, supportOrganizationCount } = res.locals;
  const renderRemoveSupportOrganizationJS = supportOrganizations.length > 0 ? true : false;

  res.render(render.view, {
    ...render.options,
    username: req.user.username,
    supportOrganizations,
    renderCreateSupportOrganizationJS: true,
    renderRemoveSupportOrganizationJS,
    paginationLinks: makePaginationLinks("/dashboard/supportorganizations", supportOrganizationCount, 10, 1),
  });
});

// URL: ~/dashboard/supportorganizations/:page
router.get("/:page", isAuthenticated, SupportOrganization.getPartition, (req, res, next) => {
  const { supportOrganizations, supportOrganizationCount } = res.locals;
  const renderRemoveSupportOrganizationJS = supportOrganizations.length > 0 ? true : false;

  res.render(render.view, {
    ...render.options,
    username: req.user.username,
    supportOrganizations,
    renderCreateSupportOrganizationJS: true,
    renderRemoveSupportOrganizationJS,
    paginationLinks: makePaginationLinks("/dashboard/supportorganizations", supportOrganizationCount, 10, req.params.page),
  });
});

// URL: ~/dashboard/supportorganizations
router.post("/", isAuthenticated, uploader.for("supportOrganizationLogo"), SupportOrganization.addNew);

// URL: ~/dashboard/supportorganizations/:id
router.delete("/:id", isAuthenticated, SupportOrganization.remove);

module.exports = router;
