import express from "express";
import { createStory } from "../../controllers/Story/createStory";
import { getStories } from "../../controllers/Story/getStories";
import { getStorybyId } from "../../controllers/Story/getStorybyId";
import { updateStory } from "../../controllers/Story/updateStory";
import { deleteStory } from "../../controllers/Story/deleteStory";
import { authCheck } from "../../middlewares/authGuard";
import { catchAsync } from "../../../utils";

const story_routes = express.Router();

story_routes.post("/stories", authCheck, catchAsync(createStory));
story_routes.get("/stories", authCheck, catchAsync(getStories));
story_routes.get("/stories/:id", authCheck, catchAsync(getStorybyId));
story_routes.put("/stories/:id", authCheck, catchAsync(updateStory));
story_routes.delete("/stories/:id", authCheck, catchAsync(deleteStory));

export default story_routes;
