const express = require("express");
const router = express();
const { index, create, find, update, destroy } = require("./controller");

router.get("/book", index);
router.post("/book", create);
router.get("/book/:id", find);
router.put("/book/:id", update);
router.delete("/book/:id", destroy);

module.exports = router;
