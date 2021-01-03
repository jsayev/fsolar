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
const dashboard_LoginRouter = require("./routes/dashboard_Login");
const dashboard_RegisterRouter = require("./routes/dashboard_Register");
const dashboard_SummitRouter = require("./routes/dashboard_Summit");
const dashboard_TestimonialRouter = require("./routes/dashboard_Testimonials");
const dashboard_EventAgendaRouter = require("./routes/dashboard_EventAgenda");
const dashboard_SubscribersRouter = require("./routes/dashboard_Subscribers");
const dashboard_AttendeesRouter = require("./routes/dashboard_Attendees");
const dashboard_SpeakerRouter = require("./routes/dashboard_Speakers");
const dashboard_ExhibitorsRouter = require("./routes/dashboard_Exhibitors");
const dashboard_PartnersRouter = require("./routes/dashboard_Partners");
const dashboard_SupportOrganizationsRouter = require("./routes/dashboard_SupportOrganizations");
const dashboard_SponsorsRouter = require("./routes/dashboard_Sponsors");
const dashboard_PasswordRouter = require("./routes/dashboard_Password");
const dashboard_LogoutRouter = require("./routes/dashboard_Logout");

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
app.use("/dashboard/login", dashboard_LoginRouter);
app.use("/dashboard/register", dashboard_RegisterRouter);
app.use("/dashboard/summit", dashboard_SummitRouter);
app.use("/dashboard/testimonials", dashboard_TestimonialRouter);
app.use("/dashboard/eventagenda", dashboard_EventAgendaRouter);
app.use("/dashboard/subscribers", dashboard_SubscribersRouter);
app.use("/dashboard/attendees", dashboard_AttendeesRouter);
app.use("/dashboard/speakers", dashboard_SpeakerRouter);
app.use("/dashboard/exhibitors", dashboard_ExhibitorsRouter);
app.use("/dashboard/partners", dashboard_PartnersRouter);
app.use("/dashboard/supportorganizations", dashboard_SupportOrganizationsRouter);
app.use("/dashboard/sponsors", dashboard_SponsorsRouter);
app.use("/dashboard/password", dashboard_PasswordRouter);
app.use("/logout", dashboard_LogoutRouter);

// unknown routers
app.use((req, res, next) => {
  res.status(404);
  res.render("error");
});

// error handler
app.use(errorHandler);

module.exports = app;
