const multer = require("multer");
const randomGenerator = require("../helpers/randomGenerator");
const slicePart = require("../helpers/slicePart");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    switch (file.fieldname) {
      case "eagenda":
        cb(null, `./public/uploads/eventAgenda`);
        break;
      case "summitBgFiles":
        cb(null, `./public/uploads/summit`);
        break;
      case "attendeeLogo":
        cb(null, `./public/uploads/attendees`);
        break;
      case "speakerPhoto":
        cb(null, `./public/uploads/speakers`);
        break;
      case "companyLogo":
        cb(null, `./public/uploads/companies`);
        break;
      case "exhibitorLogo":
        cb(null, `./public/uploads/exhibitors`);
        break;
      case "partnerLogo":
        cb(null, `./public/uploads/partners`);
        break;
      case "supportOrganizationLogo":
        cb(null, `./public/uploads/supportOrganizations`);
        break;
      case "sponsorLogo":
        cb(null, `./public/uploads/sponsors`);
        break;
      case "virtualConferenceBg":
        cb(null, `./public/uploads/virtualConference`);
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
  switch (fieldname) {
    case "summitBgFiles":
      return multer({ storage }).array(fieldname);
    case "speakerFiles":
      return multer({ storage }).fields([
        { name: "speakerPhoto", maxCount: 1 },
        { name: "companyLogo", maxCount: 1 },
      ]);
    default:
      return multer({ storage }).single(fieldname);
  }
};
