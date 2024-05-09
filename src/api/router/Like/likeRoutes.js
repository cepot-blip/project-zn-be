import express from "express";
import { addLike } from "../../controllers/Like/addLike";
import { getLike } from "../../controllers/Like/getLike";
import { deleteLike } from "../../controllers/Like/deleteLike";
import { authCheck } from "../../middlewares/authGuard";
import { catchAsync } from "../../../utils";

const like_routes = express.Router();

like_routes.post("/stories/:storyId/like", authCheck, catchAsync(addLike));
like_routes.get("/stories/:storyId/like", authCheck, catchAsync(getLike));
like_routes.delete(
  "/stories/:storyId/like/:id",
  authCheck,
  catchAsync(deleteLike)
);

export default like_routes;
