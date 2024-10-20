const express = require("express");
const productController = require("./../controller/productController");

const router = express.Router();

router
  .route("/")
  .post(productController.addProduct)
  .get(productController.getProducts);

router.get("/:productId/check-price", productController.checkPrice);
router.get("/:productId/check-description", productController.checkDescription);
router.get("/:productId", productController.getProductById);

module.exports = router;
