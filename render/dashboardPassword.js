const makeNavLinkOptions = require("./helpers/navLinkOptionsMaker");

module.exports = {
  view: "dashboardPassword",
  options: {
    title: "Future-Solar Change Password",
    renderDashboardCommons: true,
    renderPasswordJS: true,
    layout: "dashboardLayout",
    navLinkOptions: makeNavLinkOptions(),
    active: "active",
  },
};
