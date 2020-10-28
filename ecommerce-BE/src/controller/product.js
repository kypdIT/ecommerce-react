const Product = require("../models/product");
const shortid = require("shortid");
const slugify = require("slugify");

//   res.status(200).json({ file: req.file, body: req.body });
exports.createProduct = (req, res) => {
  const { name, price, description, category, createBy } = req.body;
  let productPuctures = [];

  if (req.file.length > 0) {
    productPuctures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    description,
    productPuctures,
    category,
    createBy: req.user._id,
  });

  product.save().exec((error, product) => {
    if (error) return res.status(400).json(error);
    if (product) {
      res.status(201).json({ product });
    }
  });
};
