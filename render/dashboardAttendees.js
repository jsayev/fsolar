const makeNavLinkOptions = require("./helpers/navLinkOptionsMaker");

module.exports = {
  view: "dashboardAttendees",
  options: {
    title: "Future-Solar Attendees",
    layout: "dashboardLayout",
    renderDashboardCommons: true,
    navLinkOptions: makeNavLinkOptions("Attendees"),
  },
};
