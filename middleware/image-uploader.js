const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  const acceptedFileExtensions = [
    "jpg",
    "jpeg",
    "webp",
    "png",
    "jiff",
    "gif",
    "svg",
  ];
  const fileType = file.mimetype.split("/")[1];
  if (acceptedFileExtensions.includes(fileType)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({
  fileFilter,
  storage,
});
