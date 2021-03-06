const express = require("express");
const {
  requireSignin,
  adminMiddleware,
} = require("../common-middlewave/middlewave");
const { createProduct } = require("../controller/product");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  upload.single("productPicture"),
  createProduct
);
// router.get("/product/getcategogy", getCategories);

module.exports = router;
