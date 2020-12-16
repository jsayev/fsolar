const Subscriber = require("../db/controller-mw/Subscriber");
const isAuthenticated = require("../passport").isAuthenticated;
const render = require("../render/subscribers");
const makePaginatinLinks = require("../render/paginationLinksMaker");

const router = require("express").Router();
// URL: ~/dashboard/subscribers
router.get("/", isAuthenticated(), Subscriber.getInitial, (req, res, next) => {
  res.render(render.view, {
    ...render.options,
    username: req.user.username,
    subscribers: res.locals.subscribers,
    paginationLinks: makePaginatinLinks("/dashboard/subscribers", res.locals.subscriberCount, 10, 1),
  });
});

// URL: ~/dashboard/subscribers/:page
router.get("/:page", isAuthenticated(), Subscriber.getPartition, (req, res, next) => {
  res.render(render.view, {
    ...render.options,
    username: req.user.username,
    subscribers: res.locals.subscribers,
    paginationLinks: makePaginatinLinks("/dashboard/subscribers", res.locals.subscriberCount, 10, req.params.page),
  });
});

module.exports = router;
