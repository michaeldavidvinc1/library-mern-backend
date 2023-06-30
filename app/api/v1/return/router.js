const express = require("express");
const router = express();
const { backBook, index } = require("./controller");
const {
  authenticateMember,
  authenticateUser,
} = require("../../../middlewares/auth");

router.post("/return/:id", authenticateUser, backBook);
router.get("/return", authenticateUser, index);

module.exports = router;
