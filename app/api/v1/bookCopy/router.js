const express = require("express");
const router = express();
const { index } = require("./controller");

router.get("/books/:id", index);

module.exports = router;
