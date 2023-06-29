const express = require("express");
const router = express();
const { index, create, approve, canceled } = require("./controller");
const {
  authenticateMember,
  authenticateUser,
} = require("../../../middlewares/auth");

router.get("/borrow", authenticateUser, index);
router.put("/borrow/:id/approve", authenticateUser, approve);
router.put("/borrow/:id/canceled", authenticateUser, canceled);
router.post("/borrow", authenticateMember, create);
// router.put("/categories/:id", authenticateUser, update);
// router.delete("/categories/:id", authenticateUser, destroy);

module.exports = router;
