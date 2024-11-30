const allowUploadProduct = require("../../helpers/allow_to");
const Product = require("../../models/product_model");

async function updateProductController(req, res) {
  try {
    if (!allowUploadProduct(req.userId)) {
      return res.status(400).json({
        status: "Error",
        message: "Unauthorized access.",
        data: null,
      });
    }

    const { _id, ...resBody } = req.body;

    const updateProduct = await Product.findByIdAndUpdate(_id, resBody);

    return res.status(200).json({
      status: "Success",
      message: "Product Updated successfully.",
      data: updateProduct,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Error updating product.",
      data: null,
    });
  }
}

module.exports = updateProductController;
