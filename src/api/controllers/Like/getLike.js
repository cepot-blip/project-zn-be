import { request, response } from "express";
import likeService from "../../../lib/services/Like";
import storyService from "../../../lib/services/Story";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import tokenize from "../../../utils/tokenize";

export const getLike = async (req = request, res = response) => {
  const { storyId: story_id } = req.params;
  const jwtToken = req.headers.authorization;
  const { id: user_id } = await tokenize.decodeJWT(jwtToken);

  const checkStoryId = await storyService.getStoryById(parseInt(story_id));
  if (!checkStoryId) {
    throw new NotFoundError("Story not found, put valid ID");
  }

  const result = await likeService.getLike(
    parseInt(user_id),
    parseInt(story_id)
  );

  return res.status(201).json({
    status: true,
    message: "Get like successfully",
    total_data: result.length,
    query: result,
  });
};
