async function updateProductController(req, res) {
  try {
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Error updating product.",
      data: null,
    });
  }
}

module.exports = updateProductController;
