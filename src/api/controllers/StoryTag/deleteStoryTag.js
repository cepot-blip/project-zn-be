import { request, response } from "express";
import storyTagService from "../../../lib/services/StoryTag";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const deleteStoryTag = async (req = request, res = response) => {
  const { id } = req.params;

  const checkStoryTagId = await storyTagService.getStoryTagById(parseInt(id));
  if (!checkStoryTagId) {
    throw new NotFoundError("Story tag not found, put valid ID");
  }

  await storyTagService.deleteStoryTag(parseInt(id));

  return res.status(200).json({
    status: true,
    message: "Successfully deleted story tag",
  });
};
