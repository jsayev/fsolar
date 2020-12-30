const makeNavLinkOptions = require("./helpers/navLinkOptionsMaker");
/**
 *
 * @param {String} routerName router name to make render options for
 */
module.exports = (routerName) => {
  switch (routerName) {
    case "Password":
      return {
        view: `dashboard${routerName}`,
        options: {
          title: `Future-Solar ${routerName}`,
          layout: "dashboardLayout",
          renderDashboardCommons: true,
          renderPasswordJS: true,
          navLinkOptions: makeNavLinkOptions(),
          active: "active",
        },
      };

    case "Login":
      return {
        view: `dashboard${routerName}`,
        options: {
          title: `Future-Solar ${routerName}`,
          layout: "dashboardLayout",
          renderDashboardCommons: true,
          renderLoginJS: true,
        },
      };

    case "Register":
      return {
        view: `dashboard${routerName}`,
        options: {
          title: `Future-Solar ${routerName}`,
          layout: "dashboardLayout",
          renderDashboardCommons: true,
          renderRegisterJS: true,
        },
      };

    default:
      return {
        view: `dashboard${routerName}`,
        options: {
          title: `Future-Solar ${routerName}`,
          layout: "dashboardLayout",
          renderDashboardCommons: true,
          navLinkOptions: makeNavLinkOptions(`${routerName}`),
        },
      };
  }
};
