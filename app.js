const express = require("express");
const path = require("path");
const logger = require("morgan");
const passport = require("passport");
const expSession = require("express-session");
const hbs = require("hbs");
require("dotenv").config();
require("./passport").initialize(passport);

// handlebars start
hbs.registerPartials(path.join(__dirname, "views/partials"));
// handlebars end

// client routers
const indexRouter = require("./routes/index");
const eventAgendaRouter = require("./routes/eventAgendaRouter");
const subscribeRouter = require("./routes/subscribe");
const unsubscribeRouter = require("./routes/unsubscribe");
const errorHandler = require("./routes/errorHandler");

// dashboard routers
const dashboardLoginRouter = require("./routes/dashboardLogin");
const dashboardRegisterRouter = require("./routes/dashboardRegister");
const dashboardSummitRouter = require("./routes/dashboardSummit");
const dashboardEventAgendaRouter = require("./routes/dashboardEventAgenda");
const dashboardSubscribersRouter = require("./routes/dashboardSubscribers");
const dashboardAttendeesRouter = require("./routes/dashboardAttendees");
const dashboardExhibitorsRouter = require("./routes/dashboardExhibitors");
const dashboardPartnersRouter = require("./routes/dashboardPartners");
const dashboardSupportOrganizationsRouter = require("./routes/dashboardSupportOrganizations");
const dashboardSponsorsRouter = require("./routes/dashboardSponsors");
const dashboardPasswordRouter = require("./routes/dashboardPassword");
const dashboardLogoutRouter = require("./routes/dashboardLogout");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  expSession({
    secret: "Astartes",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// client routes
app.use("/", indexRouter);
app.use("/eventagenda", eventAgendaRouter);
app.use("/subscribe", subscribeRouter);
app.use("/unsubscribe", unsubscribeRouter);

// admin routes
app.use("/dashboard/login", dashboardLoginRouter);
app.use("/dashboard/register", dashboardRegisterRouter);
app.use("/dashboard/summit", dashboardSummitRouter);
app.use("/dashboard/eventagenda", dashboardEventAgendaRouter);
app.use("/dashboard/subscribers", dashboardSubscribersRouter);
app.use("/dashboard/attendees", dashboardAttendeesRouter);
app.use("/dashboard/exhibitors", dashboardExhibitorsRouter);
app.use("/dashboard/partners", dashboardPartnersRouter);
app.use("/dashboard/supportorganizations", dashboardSupportOrganizationsRouter);
app.use("/dashboard/sponsors", dashboardSponsorsRouter);
app.use("/dashboard/password", dashboardPasswordRouter);
app.use("/logout", dashboardLogoutRouter);

// unknown routers
app.use((req, res, next) => {
  res.status(404);
  res.render("error");
});

// error handler
app.use(errorHandler);

module.exports = app;
