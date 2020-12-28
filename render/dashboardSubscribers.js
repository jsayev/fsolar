const makeNavLinkOptions = require("./helpers/navLinkOptionsMaker");

module.exports = {
  view: "dashboardSubscribers",
  options: {
    title: "Future-Solar Subscribers",
    layout: "dashboardLayout",
    renderDashboardCommons: true,
    navLinkOptions: makeNavLinkOptions("Subscribers"),
  },
};
