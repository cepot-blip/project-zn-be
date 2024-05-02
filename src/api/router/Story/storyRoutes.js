import express from "express";
import { createStory } from "../../controllers/Story/createStory";
import { getStories } from "../../controllers/Story/getStories";
import { getStorybyId } from "../../controllers/Story/getStorybyId";
import { updateStory } from "../../controllers/Story/updateStory";
import { deleteStory } from "../../controllers/Story/deleteStory";
import { authCheck } from "../../middlewares/authGuard";

const story_routes = express.Router();

story_routes.post("/stories", authCheck, createStory);
story_routes.get("/stories", authCheck, getStories);
story_routes.get("/stories/:id", authCheck, getStorybyId);
story_routes.put("/stories/:id", authCheck, updateStory);
story_routes.delete("/stories/:id", authCheck, deleteStory);

export default story_routes;
