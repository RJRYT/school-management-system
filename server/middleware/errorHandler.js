exports.NotFoundMiddleware = (req, res) => {
  res
    .status(404)
    .json({ success: false, status: 404, message: "Resource not found" });
};

exports.GlobalErrorMiddleware = (err, req, res, next) => {
  if (!err) {
    return next();
  }
  console.log("[ERROR]: Error on path:", req._parsedUrl.pathname);
  console.log("[Runtime Error]: ", err);
  res
    .status(500)
    .json({
      success: false,
      status: 500,
      message: "An Unknown error occoured in server. Try again later",
    });
};
