const Product = require("../../models/product_model");

const getCategoryWiseProduct = async (req, res) => {
  try {
    const { category } = req?.body || req?.query;
    const product = await Product.find({ category });

    console.log(product);

    res.status(200).json({
      status: "Success",
      message: "category wise product fetched successfully.",
      data: product,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Error getting category wise product.",
      data: null,
    });
  }
};

module.exports = getCategoryWiseProduct;
