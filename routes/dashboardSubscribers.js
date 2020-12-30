const Subscriber = require("../db/controller-mw/Subscriber");
const { isAuthenticated } = require("../passport");
const render = require("../render/makeRenderOpts")("Subscribers");
const makePaginationLinks = require("../render/helpers/paginationLinksMaker");
const router = require("express").Router();

// URL: ~/dashboard/subscribers
router.get("/", isAuthenticated, Subscriber.getInitial, (req, res, next) => {
  const { subscribers, subscriberCount } = res.locals;

  res.render(render.view, {
    ...render.options,
    username: req.user.username,
    subscribers,
    paginationLinks: makePaginationLinks("/dashboard/subscribers", subscriberCount, 10, 1),
  });
});

// URL: ~/dashboard/subscribers/:page
router.get("/:page", isAuthenticated, Subscriber.getPartition, (req, res, next) => {
  const { subscribers, subscriberCount } = res.locals;

  res.render(render.view, {
    ...render.options,
    username: req.user.username,
    subscribers,
    paginationLinks: makePaginationLinks("/dashboard/subscribers", subscriberCount, 10, req.params.page),
  });
});

module.exports = router;
