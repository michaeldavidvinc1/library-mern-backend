const express = require("express");
const router = express();
const { authenticateMember } = require("../../../middlewares/auth");
const { signup, activateAccount } = require("./controller");

router.post("/auth/signup", signup);
router.put("/active", activateAccount);

module.exports = router;
