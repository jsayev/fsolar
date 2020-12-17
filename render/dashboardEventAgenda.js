const makeNavLinkOptions = require("./navLinkOptionsMaker");

module.exports = {
  view: "dashboardEventAgenda",
  options: {
    layout: "dashboardLayout",
    title: "Future-Solar Dashboard",
    renderDashboardCommons: true,
    navLinkOptions: makeNavLinkOptions("Event Agenda"),
  },
};
