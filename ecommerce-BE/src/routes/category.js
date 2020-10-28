const express = require("express");
const {
  requireSignin,
  adminMiddleware,
} = require("../common-middlewave/middlewave");
const router = express.Router();
const { addCategory, getCategories } = require("../controller/category");

router.post("/category/create", requireSignin, adminMiddleware, addCategory);
router.get("/category/getcategogy", getCategories);

module.exports = router;
