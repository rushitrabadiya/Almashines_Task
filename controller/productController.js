const Product = require("./../model/productModel");
const { scrapeProduct } = require("./../helpers/scrapeHelper");
const { handleError } = require("./../helpers/errorHandler");
const { sendResponse } = require("./../helpers/responseHandler");
const { validateAddProduct } = require("./../validation/productValidation");

exports.addProduct = async (req, res) => {
  const productData = req.body;

  const validation = validateAddProduct(productData);
  if (!validation.isValid) {
    return handleError(res, null, 400, validation.message);
  }

  const { url } = req.body;
  try {
    const existingProduct = await Product.findOne({ url });
    if (existingProduct) {
      return handleError(
        res,
        null,
        400,
        "Product with this URL already exists"
      );
    }
    const scrapedData = await scrapeProduct(url);
    const product = new Product({ ...scrapedData, ...productData });
    await product.save();

    return sendResponse(res, product, 201, "Product added successfully");
  } catch (error) {
    return handleError(res, error, 500, "Failed to scrape product");
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return sendResponse(res, products, 200, "Products fetched successfully");
  } catch (error) {
    return handleError(res, error, 500, "Failed to scrape product");
  }
};
exports.getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return handleError(res, null, 404, "Product not found");
    }
    return sendResponse(res, product, 200, "Product fetched successfully");
  } catch (error) {
    return handleError(res, error, 500, "Failed to fetch product");
  }
};

exports.checkPrice = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return handleError(res, null, 404, "Product not found");
    }

    const currentPriceData = await scrapeProduct(product.url);

    if (currentPriceData && currentPriceData.price) {
      const oldPrice = product.price;
      const newPrice = currentPriceData.price;
      if (oldPrice === newPrice) {
        return sendResponse(
          res,
          { oldPrice, newPrice },
          200,
          "Price remains unchanged."
        );
      } else {
        product.priceHistory.push({ price: newPrice });
        product.price = newPrice;
        await product.save();
        return sendResponse(
          res,
          { oldPrice, newPrice },
          200,
          "Price updated successfully."
        );
      }
    } else {
      return handleError(res, null, 500, "Failed to retrieve current price");
    }
  } catch (error) {
    return handleError(res, error, 500, "Failed to check price");
  }
};

exports.checkDescription = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return handleError(res, null, 404, "Product not found");
    }

    return sendResponse(
      res,
      { description: product.description },
      200,
      "Product description fetched successfully"
    );
  } catch (error) {
    return handleError(res, error, 500, "Failed to fetch product description");
  }
};
