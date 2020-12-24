const multer = require("multer");
const randomGenerator = require("../helpers/randomGenerator");
const slicePart = require("../helpers/slicePart");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    switch (file.fieldname) {
      case "eagenda":
        cb(null, `./uploads/event-agenda`);
        break;
      case "summitBgFiles":
        cb(null, `./uploads/summit`);
      default:
        break;
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${randomGenerator(10)}.${slicePart("ext").from(file.originalname)}`);
  },
});

/**
 *
 * @param {String} fieldname formdata property name for file (single)
 */
module.exports.for = (fieldname) => {
  switch (fieldname) {
    case "event agenda":
      return multer({ storage }).single("eagenda");
    case "summit":
      return multer({ storage }).array("summitBgFiles");
    default:
      break;
  }
};
