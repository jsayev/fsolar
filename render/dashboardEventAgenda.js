const makeNavLinkOptions = require("./helpers/navLinkOptionsMaker");

module.exports = {
  view: "dashboardEventAgenda",
  options: {
    title: "Future-Solar Event Agenda",
    layout: "dashboardLayout",
    renderDashboardCommons: true,
    navLinkOptions: makeNavLinkOptions("Event Agenda"),
  },
};
