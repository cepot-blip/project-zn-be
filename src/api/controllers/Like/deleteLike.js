import { request, response } from "express";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import likeService from "../../../lib/services/Like";
import tokenize from "../../../utils/tokenize";
import UnauthorizedError from "../../../utils/exceptions/AuthorizationError";
import storyService from "../../../lib/services/Story";

export const deleteLike = async (req = request, res = response) => {
  const { storyId, id } = req.params;
  const story_id = parseInt(storyId);

  const jwtToken = req.headers.authorization;
  const { id: user_id } = await tokenize.decodeJWT(jwtToken);

  const checkStory = await storyService.getStoryById(story_id);
  if (!checkStory) {
    throw new NotFoundError("Story not found");
  }

  const checkLikeId = await likeService.getLikeById(parseInt(id));
  if (!checkLikeId) {
    throw new NotFoundError("Like not found, put valid id");
  }

  if (checkLikeId.user_id !== user_id) {
    throw new UnauthorizedError("You are not authorized to delete this like");
  }

  await likeService.deleteLike(parseInt(id));
  const like_count = await likeService.totalLikebyStoryId(story_id);

  const data = { like_count: like_count };
  await storyService.updateStory(story_id, data);

  return res.status(200).json({
    status: true,
    message: "Successfully deleted like",
  });
};
