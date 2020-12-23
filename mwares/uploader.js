const multer = require("multer");
const randomGenerator = require("./randomGenerator");

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
    let slices = file.originalname.split(".");
    let fileExtension = slices[slices.length - 1];

    cb(null, `${randomGenerator(10)}.${fileExtension}`);
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
