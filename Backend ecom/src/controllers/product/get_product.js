const Product = require("../../models/product_model");

async function getProductController(req, res) {
  try {
    const allProduct = await Product.find().sort({ createdAt: -1 });

    return res.status(200).json({
      status: "Success",
      message: "All products fetched successfully.",
      data: allProduct,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Error fetching product details.",
      data: null,
    });
  }
}

module.exports = getProductController;
