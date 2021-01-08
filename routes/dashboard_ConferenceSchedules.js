const { isAuthenticated } = require("../passport");
const ConferenceSchedule = require("../db/controller-mw/ConferenceSchedule");
const render = require("../render/makeRenderOpts")("ConferenceSchedule");

const router = require("express").Router();

// URL: ~/dashboard/conferenceschedule
router.get("/", isAuthenticated, ConferenceSchedule.getInitial, (req, res, next) => {
  const { conference } = res.locals;

  res.render(render.view, {
    ...render.options,
    username: req.user.username,
    renderCreateConferenceScheduleJS: true,
    renderRemoveConferenceScheduleAttendeeJS: conference.length > 0 ? true : false,
  });
});

// URL: ~/dashboard/conferenceschedule/:id
router.get("/:id", isAuthenticated, ConferenceSchedule.getOne, (req, res, next) => {
  const { conference } = res.locals;

  res.render(render.view, {
    ...render.options,
    username: req.user.username,
    renderCreateConferenceScheduleJS: true,
    renderRemoveConferenceScheduleAttendeeJS: conference.length > 0 ? true : false,
  });
});

// URL: ~/dashboard/conferenceschedule
router.post("/", isAuthenticated, ConferenceSchedule.addNew);

// URL: ~/dashboard/conferenceschedule/:id
router.delete("/:id", isAuthenticated, ConferenceSchedule.remove);

module.exports = router;
