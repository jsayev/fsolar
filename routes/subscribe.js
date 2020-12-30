const Subscriber = require("../db/controller-mw/Subscriber");
const router = require("express").Router();

// URL: ~/subscribe
router.post("/", Subscriber.addNew);

module.exports = router;
