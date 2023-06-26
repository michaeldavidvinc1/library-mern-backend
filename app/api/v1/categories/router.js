const express = require("express");
const router = express();
const { index, create, find, update, destroy } = require("./controller");

router.get("/categories", index);
router.get("/categories/:id", find);
router.post("/categories", create);
router.put("/categories/:id", update);
router.delete("/categories/:id", destroy);

module.exports = router;
