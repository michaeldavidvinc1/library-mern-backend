const express = require("express");
const router = express();
const { authenticateMember } = require("../../../middlewares/auth");
const { signup } = require("./controller");

router.post("/auth/signup", signup);

module.exports = router;
