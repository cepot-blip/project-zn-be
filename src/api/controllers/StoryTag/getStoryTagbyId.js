import { request, response } from "express";
import storyTagService from "../../../lib/services/StoryTag";

export const getStoryTagbyId = async (req = request, res = response) => {
  const { id } = req.params;

  const result = await storyTagService.getStoryTagById(parseInt(id));

  return res.status(200).json({
    status: true,
    message: "Get story tag successfully",
    query: result,
  });
};
