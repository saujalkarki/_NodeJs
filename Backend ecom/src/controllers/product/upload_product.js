const allowUploadProduct = require("../../helpers/allow_to");
const Product = require("../../models/product_model");

async function uploadProduct(req, res) {
  try {
    const sessionUser = req.userId;

    if (!allowUploadProduct(sessionUser)) {
      return res.status(400).json({
        status: "Error",
        message: "This user is not allowd to create product.",
        data: null,
      });
    }

    const {
      productName,
      brandName,
      category,
      productImage,
      description,
      price,
      sellingPrice,
    } = req.body;

    if (
      !productName ||
      !brandName ||
      !category ||
      !productImage[0] ||
      !description ||
      !price ||
      !sellingPrice
    ) {
      return res.status(400).json({
        status: "Error",
        message: "Please enter all the product data.",
        data: null,
      });
    }

    const newProduct = await Product.create({
      productName,
      brandName,
      category,
      productImage,
      description,
      price,
      sellingPrice,
    });

    return res.status(200).json({
      status: "Success",
      message: "Product created successfully.",
      data: newProduct,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Error uploading product.",
      data: null,
    });
  }
}

module.exports = uploadProduct;
