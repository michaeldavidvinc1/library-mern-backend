const express = require("express");
const router = express();
const { index, create, find, update, destroy } = require("./controller");
const { authenticateUser } = require("../../../middlewares/auth");

router.get("/categories", authenticateUser, index);
router.get("/categories/:id", authenticateUser, find);
router.post("/categories", authenticateUser, create);
router.put("/categories/:id", authenticateUser, update);
router.delete("/categories/:id", authenticateUser, destroy);

module.exports = router;
