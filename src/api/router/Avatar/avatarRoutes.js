import express from "express";
import createAvatar from "../../controllers/Avatar/createAvatar";
import { authCheck } from "../../middlewares/authGuard";
import { catchAsync } from "../../../utils";
import getAvatars from "../../controllers/Avatar/getAvatars";
import getAvatarById from "../../controllers/Avatar/getAvatarById";
import updateAvatarById from "../../controllers/Avatar/updateAvatarById";
import deleteAvatarById from "../../controllers/Avatar/deleteAvatarById";

const avatar_routes = express.Router();

avatar_routes.post("/avatar", authCheck, catchAsync(createAvatar));
avatar_routes.get("/avatar", authCheck, catchAsync(getAvatars));
avatar_routes.get("/avatar/:id", authCheck, catchAsync(getAvatarById));
avatar_routes.put("/avatar/:id", authCheck, catchAsync(updateAvatarById));
avatar_routes.delete("/avatar/:id", authCheck, catchAsync(deleteAvatarById));

export default avatar_routes;
