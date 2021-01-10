const { isAuthenticated } = require("../passport");
const ConferenceSchedule = require("../db/controller-mw/ConferenceSchedule");
const render = require("../render/makeRenderOpts")("ConferenceSchedule");
const dateformat = require("dateformat");

const router = require("express").Router();

// URL: ~/dashboard/conferenceschedule
router.get("/", isAuthenticated, ConferenceSchedule.getAllDates, (req, res, next) => {
  const { conferences } = res.locals;
  const renderRemoveConfScheduleDateJS = conferences.length > 0 ? true : false;

  conferences.sort((c1, c2) => Date.parse(c1.date) - Date.parse(c2.date));
  conferences.forEach((c) => (c.date = dateformat(c.date, "d mmm yyyy")));

  res.render(render.view, {
    ...render.options,
    username: req.user.username,
    conferences,
    renderCreateConfScheduleDateJS: true,
    renderRemoveConfScheduleDateJS,
    renderConfScheduleGetTimesJS: renderRemoveConfScheduleDateJS,
  });
});

// URL: ~/dashboard/conferenceschedule/date/:id
router.get("/date/:id", isAuthenticated, ConferenceSchedule.getTimesForDate);

// URL: ~/dashboard/conferenceschedule
router.post("/", isAuthenticated, ConferenceSchedule.addNewDate);

// URL: ~/dashboard/conferenceschedule/:dateID/break
router.post("/:dateID/break", isAuthenticated, ConferenceSchedule.addBreakTime);

// URL: ~/dashboard/conferenceschedule/:dateID/presentation
router.post("/:dateID/presentation", isAuthenticated, ConferenceSchedule.addPresentationTime);

// URL: ~/dashboard/conferenceschedule/date/:id
router.delete("/date/:id", isAuthenticated, ConferenceSchedule.removeDate);

// URL: ~/dashboard/conferenceschedule/time/:id
router.delete("/time/:id", isAuthenticated, ConferenceSchedule.removeTime);

module.exports = router;
