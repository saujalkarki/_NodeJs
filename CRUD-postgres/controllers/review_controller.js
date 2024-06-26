const prisma = require("../database/db_config");

// create review
exports.createReview = async (req, res) => {
  const { userId, review } = req.body;

  if (!userId || !review) {
    return res.status(400).json({
      status: "error",
      message: "Please Enter all the data.",
      data: null,
    });
  }

  const newUser = await prisma.review.create({
    data: {
      userId: Number(userId),
      review,
    },
  });

  res.status(200).json({
    status: "Success",
    message: "review created successfully.",
    data: newUser,
  });
};

// update review
exports.updateReview = async (req, res) => {
  const id = req.params.id;
  const { review } = req.body;

  const reviewExist = await prisma.review.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!reviewExist) {
    return res.status(400).json({
      status: "Error",
      message: "review doesn't exist.",
      data: null,
    });
  }

  const updatedUser = await prisma.review.update({
    where: {
      id: Number(id),
    },
    data: {
      review: review || reviewExist.review,
    },
  });

  res.status(200).json({
    status: "Success",
    message: "review updated successfully.",
    data: updatedUser,
  });
};

// delete review
exports.deleteReview = async (req, res) => {
  const id = req.params.id;

  const reviewExist = await prisma.review.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!reviewExist) {
    return res.status(400).json({
      success: "Error",
      message: "review no longer exist.",
      data: null,
    });
  }

  await prisma.review.delete({
    where: {
      id: Number(id),
    },
  });

  res.status(200).json({
    status: "Success",
    message: "review deleted Successfully.",
    data: null,
  });
};

// read all review
exports.readAllReview = async (req, res) => {
  const allReview = await prisma.review.findMany();

  if (allReview.length === 0) {
    return res.status(400).json({
      status: "error",
      message: "Nothing reviewed yet.",
      data: allReview,
    });
  }

  res.status(200).json({
    status: "Success",
    message: "Reviews fetched successfully.",
    data: allReview,
  });
};

// read Single review
exports.getSingleReview = async (req, res) => {
  const id = req.params.id;

  const reviewExist = await prisma.review.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!reviewExist) {
    return res.status(400).json({
      status: "error",
      message: "review doesn't exist.",
      data: null,
    });
  }

  res.status(200).json({
    status: "Success",
    message: "review fetched successfully.",
    data: reviewExist,
  });
};
