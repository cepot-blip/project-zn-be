import { request, response } from "express";
import storyTagService from "../../../lib/services/StoryTag";
import tagService from "../../../lib/services/Tag";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import StoryTagValidation from "../../../validation/StoryTag";

export const updateStoryTag = async (req = request, res = response) => {
  const { id } = req.params;
  const { tag_id } = req.body;
  StoryTagValidation.validatePayloadStoryTag({ tag_id });

  const checkTagId = await tagService.getTagById(parseInt(tag_id));
  if (!checkTagId) {
    throw new NotFoundError("Tag not found, put valid id");
  }

  const checkstoryTagId = await storyTagService.getStoryTagById(parseInt(id));
  if (!checkstoryTagId) {
    throw new NotFoundError("Story tag not found, put valid id");
  }

  await storyTagService.updateStoryTag(parseInt(id), parseInt(tag_id));

  return res.status(200).json({
    status: true,
    message: "Successfully update story tag",
  });
};
