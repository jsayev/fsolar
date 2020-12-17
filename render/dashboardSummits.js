const makeNavLinkOptions = require("./navLinkOptionsMaker");

module.exports = {
  view: "dashboardSummits",
  options: {
    title: "Future-Solar Summits",
    renderDashboardCommons: true,
    layout: "dashboardLayout",
    navLinkOptions: makeNavLinkOptions("Summits"),
  },
};
