import express from "express";
import { addStoryTag } from "../../controllers/StoryTag/addStoryTag";
import { getStoryTags } from "../../controllers/StoryTag/getStoryTags";
import { getStoryTagbyId } from "../../controllers/StoryTag/getStoryTagbyId";
import { updateStoryTag } from "../../controllers/StoryTag/updateStoryTag";
import { deleteStoryTag } from "../../controllers/StoryTag/deleteStoryTag";
import { catchAsync } from "../../../utils";

const storyTag_routes = express.Router();

storyTag_routes.post("/storyTag", catchAsync(addStoryTag));
storyTag_routes.get("/storyTag", catchAsync(getStoryTags));
storyTag_routes.get("/storyTag/:id", catchAsync(getStoryTagbyId));
storyTag_routes.put("/storyTag/:id", catchAsync(updateStoryTag));
storyTag_routes.delete("/storyTag/:id", catchAsync(deleteStoryTag));

export default storyTag_routes;
