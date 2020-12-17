const EventAgenda = require("../db/controller-mw/EventAgenda");
const isAuthenticated = require("../passport").isAuthenticated;
const uploader = require("../mwares/uploader");
const render = require("../render/dashboardEventAgenda");

const router = require("express").Router();
// URL: ~/dashboard/eventagenda
router.get("/", isAuthenticated, EventAgenda.listAll, (req, res, next) => {
  res.render(render.view, { ...render.options });
});

// URL: ~/dashboard/eventagenda
router.post("/", isAuthenticated, uploader("eagenda"), EventAgenda.create);

// URL: ~/dashboard/eventagenda/:id
router.delete("/:id", isAuthenticated, EventAgenda.deleteOne);

// URL: ~/dashboard/eventagenda/all
router.delete("/all", isAuthenticated, EventAgenda.deleteAll);

module.exports = router;
