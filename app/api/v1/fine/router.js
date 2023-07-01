const express = require("express");
const router = express();
const { index, pay } = require("./controller");
const { authenticateUser } = require("../../../middlewares/auth");

router.get("/fine", authenticateUser, index);
router.put("/fine/:id", authenticateUser, pay);

module.exports = router;
