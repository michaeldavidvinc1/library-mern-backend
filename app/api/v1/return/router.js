const express = require("express");
const router = express();
const { backBook } = require("./controller");
const {
  authenticateMember,
  authenticateUser,
} = require("../../../middlewares/auth");

router.post("/return/:id", authenticateUser, backBook);

module.exports = router;
