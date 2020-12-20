const makeNavLinkOptions = require("./helpers/navLinkOptionsMaker");

module.exports = {
  view: "dashboardEventAgenda",
  options: {
    layout: "dashboardLayout",
    title: "Future-Solar Event Agenda",
    renderDashboardCommons: true,
    navLinkOptions: makeNavLinkOptions("Event Agenda"),
  },
};
