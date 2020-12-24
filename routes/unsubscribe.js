const Subscriber = require("../db/controller-mw/Subscriber");
const router = require("express").Router();

// URL: ~/unsubscribe/:email
router.get("/:email", Subscriber.remove);

module.exports = router;
