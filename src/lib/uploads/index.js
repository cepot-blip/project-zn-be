import fs from "fs";
import path from "path";
import multer from "multer";
import ImageUploadValidation from "../../validation/ImageUpload";

// STORAGE UPLOAD IMAGE
const destinationStorage = path.join(__dirname, "../../../public/images");

const checkIfExistDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

checkIfExistDir(destinationStorage);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, destinationStorage);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.fieldname}.png`);
  },
});

const fileFilter = (req, file, cb) => {
  ImageUploadValidation.validateImageUpload({ image: file.mimetype });
  cb(null, true);
};

const imageUploadMulter = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: process.env.MAX_IMAGE_SIZE,
    files: 1,
  },
});

export { imageUploadMulter, multer };
