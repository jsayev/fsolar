const makeNavLinkOptions = require("./helpers/navLinkOptionsMaker");

module.exports = {
  view: "dashboardPassword",
  options: {
    title: "Future-Solar Change Password",
    layout: "dashboardLayout",
    renderDashboardCommons: true,
    renderPasswordJS: true,
    navLinkOptions: makeNavLinkOptions(),
    active: "active",
  },
};
