import express from "express";
import { catchAsync } from "../../../utils";
import getPlatforms from "../../controllers/Platform/getPlaforms";
import getPlatformById from "../../controllers/Platform/getPlatformById";
import { authCheck } from "../../middlewares/authGuard";

const platform_routes = express.Router();

platform_routes.get("/platforms", authCheck, catchAsync(getPlatforms));
platform_routes.get("/platforms/:id", authCheck, catchAsync(getPlatformById));

export default platform_routes;
