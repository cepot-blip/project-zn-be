import { request, response } from "express";
import storyTagService from "../../../lib/services/StoryTag";

export const getStoryTags = async (req = request, res = response) => {
  const result = await storyTagService.getStoryTag();

  return res.status(200).json({
    status: true,
    message: "Get story tag successfully",
    query: result,
  });
};
