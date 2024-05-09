import express from "express";
import { addReStory } from "../../controllers/ReStory/addReStory";
import { getReStory } from "../../controllers/ReStory/getReStory";
import { getReStorybyId } from "../../controllers/ReStory/getReStorybyId";
import { deleteReStory } from "../../controllers/ReStory/deleteReStory";
import { authCheck } from "../../middlewares/authGuard";
import { catchAsync } from "../../../utils";

const reStory_routes = express.Router();

reStory_routes.post(
  "/stories/:storyId/reStory",
  authCheck,
  catchAsync(addReStory)
);
reStory_routes.get(
  "/stories/:storyId/reStory",
  authCheck,
  catchAsync(getReStory)
);
reStory_routes.get(
  "/stories/:storyId/reStory/:id",
  authCheck,
  catchAsync(getReStorybyId)
);
reStory_routes.delete(
  "/stories/:storyId/reStory/:id",
  catchAsync(deleteReStory)
);

export default reStory_routes;
