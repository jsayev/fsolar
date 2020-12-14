const makeNavLinkOptions = require("./navLinkOptionsMaker");

module.exports = {
  view: "dashboardPassword",
  options: {
    title: "Future-Solar Dashboard",
    renderDashboardCommons: true,
    renderPasswordJS: true,
    layout: "dashboardLayout",
    navLinkOptions: makeNavLinkOptions(),
    active: "active",
  },
};
