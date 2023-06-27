const express = require("express");
const router = express();
const { create } = require("./controller");

router.post("/user", create);

module.exports = router;
