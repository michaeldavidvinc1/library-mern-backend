const express = require("express");
const router = express();
const { create } = require("./controller");
const { authenticateUser } = require("../../../middlewares/auth");

router.post("/user", authenticateUser, create);

module.exports = router;
