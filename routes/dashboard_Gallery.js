const { isAuthenticated } = require("../passport");
const uploader = require("../multer-uploadmw/uploader");
const Gallery = require("../db/controller-mw/Gallery");
const render = require("../render/makeRenderOpts")("Gallery");
const makePaginationLinks = require("../render/helpers/paginationLinksMaker");

const router = require("express").Router();

// URL: ~/dashboard/gallery
router.get("/", isAuthenticated, Gallery.getInitial, (req, res, next) => {
  const { pictures, pictureCount } = res.locals;
  const renderRemoveGalleryJS = pictures.length > 0 ? true : false;

  res.render(render.view, {
    ...render.options,
    username: req.user.username,
    pictures,
    renderCreateGalleryJS: true,
    renderRemoveGalleryJS,
    paginationLinks: makePaginationLinks("/dashboard/gallery", pictureCount, 10, 1),
  });
});

// URL: ~/dashboard/gallery/:page
router.get("/:page", isAuthenticated, Gallery.getPartition, (req, res, next) => {
  const { pictures, pictureCount } = res.locals;
  const renderRemoveGalleryJS = pictures.length > 0 ? true : false;

  res.render(render.view, {
    ...render.options,
    username: req.user.username,
    pictures,
    renderCreateGalleryJS: true,
    renderRemoveGalleryJS,
    paginationLinks: makePaginationLinks("/dashboard/gallery", pictureCount, 10, req.params.page),
  });
});

// URL: ~/dashboard/gallery
router.post("/", isAuthenticated, uploader.for("galleryPicture"), Gallery.addNew);

// URL: ~/dashboard/gallery/:id
router.delete("/:id", isAuthenticated, Gallery.remove);

module.exports = router;
