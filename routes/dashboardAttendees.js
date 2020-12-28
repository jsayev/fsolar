const { isAuthenticated } = require("../passport");
const uploader = require("../multer-uploadmw/uploader");
const Attendee = require("../db/controller-mw/Attendee");
const render = require("../render/dashboardAttendees");
const makePaginationLinks = require("../render/helpers/paginationLinksMaker");

const router = require("express").Router();

// URL: ~/dashboard/attendees
router.get("/", isAuthenticated, Attendee.getInitial, (req, res, next) => {
  const { attendees, attendeeCount } = res.locals;
  const renderRemoveAttendeeJS = attendees.length > 0 ? true : false;

  res.render(render.view, {
    ...render.options,
    username: req.user.username,
    attendees,
    renderCreateAttendeeJS: true,
    renderRemoveAttendeeJS,
    paginationLinks: makePaginationLinks("/dashboard/attendees", attendeeCount, 10, 1),
  });
});

// URL: ~/dashboard/attendees/:page
router.get("/:page", isAuthenticated, Attendee.getPartition, (req, res, next) => {
  const { attendees, attendeeCount } = res.locals;
  const renderRemoveAttendeeJS = attendees.length > 0 ? true : false;

  res.render(render.view, {
    ...render.options,
    username: req.user.username,
    attendees,
    renderCreateAttendeeJS: true,
    renderRemoveAttendeeJS,
    paginationLinks: makePaginationLinks("/dashboard/attendees", attendeeCount, 10, req.params.page),
  });
});

// URL: ~/dashboard/attendees
router.post("/", isAuthenticated, uploader.for("attendeeLogo"), Attendee.addNew);

// URL: ~/dashboard/attendees/:id
router.delete("/:id", isAuthenticated, Attendee.remove);

module.exports = router;
