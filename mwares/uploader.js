const multer = require("multer");
const randomGenerator = require("./randomGenerator");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    switch (file.fieldname) {
      case "eagenda":
        cb(null, `./uploads/event-agenda`);
        break;
      default:
        break;
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${randomGenerator(10)}.${file.originalname.split(".")[1]}`);
  },
});

/**
 *
 * @param {String} fieldname Value of file input name attribute
 */
module.exports.single = (fieldname) => {
  return multer({ storage }).single(fieldname);
};

module.exports.array = (fieldname) => {
  return multer({ storage }).array(fieldname);
};
