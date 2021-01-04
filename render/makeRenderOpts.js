const makeNavLinkOptions = require("./helpers/navLinkOptionsMaker");

/**
 *
 * @param {String} routerName router name to make render options for
 */
module.exports = (routerName) => {
  switch (routerName) {
    case "Password":
      return {
        view: `dashboard_${routerName}`,
        options: {
          title: `Future-Solar ${routerName}`,
          layout: "dashboard_Layout",
          renderDashboardCommons: true,
          renderPasswordJS: true,
          navLinkOptions: makeNavLinkOptions(),
          active: "active",
        },
      };

    case "Login":
      return {
        view: `dashboard_${routerName}`,
        options: {
          title: `Future-Solar ${routerName}`,
          layout: "dashboard_Layout",
          renderDashboardCommons: true,
          renderLoginJS: true,
        },
      };

    case "Register":
      return {
        view: `dashboard_${routerName}`,
        options: {
          title: `Future-Solar ${routerName}`,
          layout: "dashboard_Layout",
          renderDashboardCommons: true,
          renderRegisterJS: true,
        },
      };

    default:
      return {
        view: `dashboard_${routerName}`,
        options: {
          title: `Future-Solar ${routerName}`,
          layout: "dashboard_Layout",
          renderDashboardCommons: true,
          navLinkOptions: makeNavLinkOptions(`${routerName}`),
        },
      };
  }
};
