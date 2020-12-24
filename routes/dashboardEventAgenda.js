const EventAgenda = require("../db/controller-mw/EventAgenda");
const isAuthenticated = require("../passport").isAuthenticated;
const uploader = require("../multer-uploadmw/uploader");
const render = require("../render/dashboardEventAgenda");
const router = require("express").Router();

// URL: ~/dashboard/eventagenda
router.get("/", isAuthenticated, EventAgenda.pickAll, (req, res, next) => {
  const agendaFile = res.locals.agenda;
  const renderUploadAgendaJS = !agendaFile;
  const renderRemoveAgendaJS = !renderUploadAgendaJS;

  res.render(render.view, { ...render.options, agendaFile, renderRemoveAgendaJS, renderUploadAgendaJS, username: req.user.username });
});

// URL: ~/dashboard/eventagenda
router.post("/", isAuthenticated, uploader.for("event agenda"), EventAgenda.create);

// URL: ~/dashboard/eventagenda/:id
router.delete("/", isAuthenticated, EventAgenda.delete);

module.exports = router;
