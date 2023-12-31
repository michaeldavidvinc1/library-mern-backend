const express = require("express");
const router = express();
const { index } = require("./controller");
const { authenticateUser } = require("../../../middlewares/auth");

router.get("/books/:id", authenticateUser, index);

module.exports = router;
