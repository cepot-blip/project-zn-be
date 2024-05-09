import { request, response } from "express";
import storyService from "../../../lib/services/Story";
import reStoryService from "../../../lib/services/ReStory";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import tokenize from "../../../utils/tokenize";
import ReStoryValidation from "../../../validation/ReStory";

export const addReStory = async (req = request, res = response) => {
  const { storyId: story_id } = req.params;

  const jwtToken = req.headers.authorization;
  const { id: user_id } = await tokenize.decodeJWT(jwtToken);

  ReStoryValidation.validatePayloadReStory({ user_id, story_id });

  const checkStorybyId = await storyService.getStoryById(parseInt(story_id));
  if (!checkStorybyId) {
    throw new NotFoundError("Story not found, put valid id");
  }

  await reStoryService.createReStory(parseInt(user_id), parseInt(story_id));
  return res.status(201).json({
    status: true,
    message: "Successfully create reStory",
  });
};
