import { request, response } from "express";
import storyService from "../../../lib/services/Story";
import tokenize from "../../../utils/tokenize";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import AuthorizationError from "../../../utils/exceptions/AuthorizationError";
import { StoryModels } from "../../../models/Models";

export const deleteStory = async (req = request, res = response) => {
  const { id } = req.params;

  const jwtToken = req.headers.authorization;
  const { id: user_id } = await tokenize.decodeJWT(jwtToken);

  const checkStorybyId = await storyService.getStoryById(parseInt(id));
  if (!checkStorybyId) {
    throw new NotFoundError("Story not found, put valid id");
  }

  const verifyStorybyUserId = await storyService.checkAvailabilityStoryByUserId(
    parseInt(id),
    user_id
  );
  if (!verifyStorybyUserId) {
    throw new AuthorizationError("User not authorized to access");
  }

  await storyService.deleteStory(parseInt(id));

  return res.status(200).json({
    status: true,
    message: "Successfully delete story",
  });
};
