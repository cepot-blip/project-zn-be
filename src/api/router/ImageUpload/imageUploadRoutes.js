import express from "express";
import { catchAsync } from "../../../utils";
import { authCheck } from "../../middlewares/authGuard";
import imageUpload from "../../controllers/ImageUpload/imageUpload";

const image_upload_routes = express.Router();

image_upload_routes.post("/image-uploads", authCheck, catchAsync(imageUpload));

export default image_upload_routes;
