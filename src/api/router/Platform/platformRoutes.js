import express from "express";
import { catchAsync } from "../../../utils";
import getPlatforms from "../../controllers/Platform/getPlaforms";
import getPlatformById from "../../controllers/Platform/getPlatformById";

const platform_routes = express.Router();

platform_routes.get("/platform", catchAsync(getPlatforms));
platform_routes.get("/platform/:id", catchAsync(getPlatformById));

export default platform_routes;
