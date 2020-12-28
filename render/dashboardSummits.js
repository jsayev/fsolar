const makeNavLinkOptions = require("./helpers/navLinkOptionsMaker");

module.exports = {
  view: "dashboardSummits",
  options: {
    title: "Future-Solar Summits",
    layout: "dashboardLayout",
    renderDashboardCommons: true,
    navLinkOptions: makeNavLinkOptions("Summits"),
  },
};
