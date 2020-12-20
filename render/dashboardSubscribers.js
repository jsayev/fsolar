const makeNavLinkOptions = require("./helpers/navLinkOptionsMaker");

module.exports = {
  view: "dashboardSubscribers",
  options: {
    title: "Future-Solar Subscribers",
    renderDashboardCommons: true,
    layout: "dashboardLayout",
    navLinkOptions: makeNavLinkOptions("Subscribers"),
  },
};
