const EventAgenda = require("../db/controller-mw/EventAgenda");
const isAuthenticated = require("../mwares/isAuthenticated");
const uploader = require("../mwares/uploader");

const router = require("express").Router();
// URL: ~/event-agenda
router.get("/:filename", (req, res, next) => {
  res.download(`./uploads/event-agenda/${req.params.filename}`, (err) => {
    if (err) next(`File doesn't exist!`);
  });
});

// URL: ~/event-agenda
router.get("/", isAuthenticated, EventAgenda.listAll);

// URL: ~/event-agenda
router.post("/", isAuthenticated, uploader("eagenda"), EventAgenda.create);

// URL: ~/event-agenda/:id
router.delete("/:id", isAuthenticated, EventAgenda.deleteOne);

// URL: ~/event-agenda
router.delete("/", isAuthenticated, EventAgenda.deleteAll);

module.exports = router;
