import express from "express";
import { createComments } from "../../controllers/Comments/createComments";
import { getComments } from "../../controllers/Comments/getComments";
import { getCommentsbyId } from "../../controllers/Comments/getCommentsbyId";
import { updateComments } from "../../controllers/Comments/updateComments";
import { deleteComments } from "../../controllers/Comments/deleteComments";
import { authCheck } from "../../middlewares/authGuard";
import { catchAsync } from "../../../utils";

const comments_routes = express.Router();

comments_routes.post(
  "/stories/:storyId/comments/",
  authCheck,
  catchAsync(createComments)
);
comments_routes.get(
  "/stories/:storyId/comments/",
  authCheck,
  catchAsync(getComments)
);
comments_routes.get(
  "/stories/:storyId/comments/:id",
  authCheck,
  catchAsync(getCommentsbyId)
);
comments_routes.put(
  "/stories/:storyId/comments/:id",
  authCheck,
  catchAsync(updateComments)
);
comments_routes.delete(
  "/stories/:storyId/comments/:id",
  authCheck,
  catchAsync(deleteComments)
);

export default comments_routes;
