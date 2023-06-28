const express = require("express");
const router = express();
const { authenticateMember } = require("../../../middlewares/auth");
const { signup, activateAccount, signin } = require("./controller");

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.put("/active", activateAccount);

module.exports = router;
