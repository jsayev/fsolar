const makeNavLinkOptions = require("./navLinkOptionsMaker");

module.exports = {
  view: "dashboardIndex",
  options: {
    title: "Future-Solar Dashboard",
    renderDashboardCommons: true,
    layout: "dashboardLayout",
    navLinkOptions: makeNavLinkOptions("Summits"),
  },
};
