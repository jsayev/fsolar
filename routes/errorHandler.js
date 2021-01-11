const { MulterError } = require("multer");

module.exports = (err, req, res, next) => {
  console.log(err);
  // sql error
  if (err.sql) {
    res.status(500);
    return res.json({ error: true, message: "Internal server error!" });
  }
  // uploading error
  if (err instanceof MulterError) {
    res.status(500);
    return res.json({ error: true, message: "Uploading failed!" });
  }
  // rest of the errors
  res.status(400);
  res.json({ error: true, message: err });
};
