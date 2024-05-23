import { request, response } from "express";
import likeService from "../../../lib/services/Like";
import storyService from "../../../lib/services/Story";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import tokenize from "../../../utils/tokenize";

export const getLike = async (req = request, res = response) => {
  const story_id = parseInt(req.params.storyId);

  const jwtToken = req.headers.authorization;
  const { id: user_id } = await tokenize.decodeJWT(jwtToken);

  const checkStoryId = await storyService.getStoryById(story_id);
  if (!checkStoryId) {
    throw new NotFoundError("Story not found, put valid ID");
  }

  const result = await likeService.checkAvailabilityLike(user_id, story_id);

  return res.status(201).json({
    status: true,
    message: "Get like successfully",
    query: result,
  });
};
