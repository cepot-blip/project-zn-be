import { request, response } from "express";
import storyTagService from "../../../lib/services/StoryTag";
import tagService from "../../../lib/services/Tag";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import StoryTagValidation from "../../../validation/StoryTag";

export const addStoryTag = async (req = request, res = response) => {
  const { tag_id } = req.body;
  StoryTagValidation.validatePayloadStoryTag({ tag_id });

  const checkTagbyId = await tagService.getTagById(parseInt(tag_id));
  if (!checkTagbyId) {
    throw new NotFoundError("Tag not found, put valid id");
  }

  await storyTagService.createStoryTag(parseInt(tag_id));
  return res.status(201).json({
    status: true,
    message: "Successfully add story tag",
  });
};
