const Product = require("../../models/product_model");

const getProductCategory = async (req, res) => {
  try {
    const productCategory = await Product.distinct("category");

    const productByCategory = [];

    for (const category of productCategory) {
      const product = await Product.findOne({ category });

      if (product) {
        productByCategory.push(product);
      }
    }

    return res.status(200).json({
      status: "Success",
      message: "Product fetched successfully.",
      data: productByCategory,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Error fetching product category.",
      data: null,
    });
  }
};

module.exports = getProductCategory;
