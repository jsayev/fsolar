const Subscriber = require("../db/controller-mw/Subscriber");

const router = require("express").Router();
// URL: ~/subscribe
router.post("/", Subscriber.addNew);

// URL: ~/subscribe/:email
router.delete("/:email", Subscriber.remove);

module.exports = router;
