import express from "express";
import {
  createStory,
  getStories,
  getStorybyId,
  updateStory,
  deleteStory,
} from "../../controllers/Story";
import { authCheck } from "../../middlewares/authGuard";

const story_routes = express.Router();

story_routes.post("/story/create", authCheck, createStory);
story_routes.get("/story/get", authCheck, getStories);
story_routes.get("/story/get-byid/:id", authCheck, getStorybyId);
story_routes.put("/story/update/:id", authCheck, updateStory);
story_routes.delete("/story/delete/:id", authCheck, deleteStory);

export default story_routes;
