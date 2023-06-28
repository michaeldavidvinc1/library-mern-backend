const express = require("express");
const router = express();
const { index, create, find, update, destroy } = require("./controller");
const { authenticateUser } = require("../../../middlewares/auth");

router.get("/book", authenticateUser, index);
router.post("/book", authenticateUser, create);
router.get("/book/:id", authenticateUser, find);
router.put("/book/:id", authenticateUser, update);
router.delete("/book/:id", authenticateUser, destroy);

module.exports = router;
