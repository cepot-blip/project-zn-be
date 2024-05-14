import { request, response } from "express";
import { imageUploadMulter, multer } from "../../../lib/uploads";
import InvariantError from "../../../utils/exceptions/InvariantError";
import { destImageLink } from "../../../utils";

const upload = imageUploadMulter.single("image");

const imageUpload = async (req = request, res = response, next) => {
  upload(req, res, (err) => {
    try {
      if (err instanceof multer.MulterError) {
        throw new InvariantError(err.message);
      }
      return res.status(201).json({
        status: true,
        message: "Image uploaded successfully",
        image_link: destImageLink(req.file.path),
      });
    } catch (error) {
      next(error);
    }
  });
};

export default imageUpload;
