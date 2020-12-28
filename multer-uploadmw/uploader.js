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
        break;
      case "attendeeLogo":
        cb(null, `./uploads/attendees`);
        break;
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
 * @param {String} fieldname formdata property name for file(s)
 */
module.exports.for = (fieldname) => {
  if (fieldname[fieldname.length - 1] === "s") return multer({ storage }).array(fieldname);
  return multer({ storage }).single(fieldname);
};
