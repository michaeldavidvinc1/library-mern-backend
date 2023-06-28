const express = require("express");
const router = express();
const { index } = require("./controller");

router.get("/refresh-token/:refreshToken", index);

module.exports = router;
