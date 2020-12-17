const express = require("express");
const path = require("path");
const logger = require("morgan");
const passport = require("passport");
const expSession = require("express-session");
const hbs = require("hbs");

require("dotenv").config();
require("./passport").initialize(passport);

// client routers
const indexRouter = require("./routes/index");
const eventAgendaRouter = require("./routes/eventAgendaRouter");
const subscribeRouter = require("./routes/subscribe");
const unsubscribeRouter = require("./routes/unsubscribe");
const galleryRouter = require("./routes/gallery");
const errorHandler = require("./routes/errorHandler");
// admin routers
const adminLoginRouter = require("./routes/dashboardLogin");
const adminRegisterRouter = require("./routes/dashboardRegister");
const dashboardSummitsRouter = require("./routes/dashboardSummits");
const dashboardSubscribersRouter = require("./routes/dashboardSubscribers");
const dashboardPasswordRouter = require("./routes/dashboardPassword");
const logoutRouter = require("./routes/logout");

const app = express();
const dashboardEventAgendaRouter = require("./routes/dashboardEventAgenda");
hbs.registerPartials(path.join(__dirname, "views/partials"));
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
app.use("/gallery", galleryRouter);
// admin routes
app.use("/dashboard/login", adminLoginRouter);
app.use("/dashboard/register", adminRegisterRouter);
app.use("/dashboard/summits", dashboardSummitsRouter);
app.use("/dashboard/eventagenda", dashboardEventAgendaRouter);
app.use("/dashboard/subscribers", dashboardSubscribersRouter);
app.use("/dashboard/password", dashboardPasswordRouter);
app.use("/logout", logoutRouter);
// unknown routers
app.use((req, res, next) => {
  res.status(404);
  res.render("error");
});
// error handler
app.use(errorHandler);

module.exports = app;
