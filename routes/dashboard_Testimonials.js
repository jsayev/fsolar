const { isAuthenticated } = require("../passport");
const Testimonial = require("../db/controller-mw/Testimonial");
const render = require("../render/makeRenderOpts")("Testimonials");
const makePaginationLinks = require("../render/helpers/paginationLinksMaker");

const router = require("express").Router();

// URL: ~/dashboard/testimonials
router.get("/", isAuthenticated, Testimonial.getInitial, (req, res, next) => {
  const { testimonials, testimonialCount, speakers } = res.locals;
  const renderRemoveTestimonialJS = testimonials.length > 0 ? true : false;

  res.render(render.view, {
    ...render.options,
    username: req.user.username,
    testimonials,
    speakers,
    renderCreateTestimonialJS: true,
    renderRemoveTestimonialJS,
    paginationLinks: makePaginationLinks("/dashboard/testimonials", testimonialCount, 10, 1),
  });
});

// URL: ~/dashboard/testimonials/:page
router.get("/:page", isAuthenticated, Testimonial.getPartition, (req, res, next) => {
  const { testimonials, testimonialCount, speakers } = res.locals;
  const renderRemoveTestimonialJS = testimonials.length > 0 ? true : false;

  res.render(render.view, {
    ...render.options,
    username: req.user.username,
    testimonials,
    speakers,
    renderCreateTestimonialJS: true,
    renderRemoveTestimonialJS,
    paginationLinks: makePaginationLinks("/dashboard/testimonials", testimonialCount, 10, req.params.page),
  });
});

// URL: ~/dashboard/testimonials
router.post("/", isAuthenticated, Testimonial.addNew);

// URL: ~/dashboard/testimonials/:id
router.delete("/:id", isAuthenticated, Testimonial.remove);

module.exports = router;
