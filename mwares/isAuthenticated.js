module.exports = (req, res, next) => {
  try {
    if (req.headers.auth === process.env.AUTH_KEY) {
      return next();
    }
    throw "Not allowed!";
  } catch (error) {
    next(error);
  }
};
