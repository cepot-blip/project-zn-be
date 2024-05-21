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

  const checkLikeId = await likeService.getLikeById(parseInt(id));
  if (!checkLikeId) {
    throw new NotFoundError("Like not found, put valid id");
  }

  if (checkLikeId.user_id !== user_id) {
    throw new UnauthorizedError("You are not authorized to delete this like");
  }

  try {
    await likeService.deleteLike(parseInt(id));
    const like_count = await likeService.getStoryLikes(story_id);

    if (like_count && like_count.length > 0) {
      await storyService.updateLikeStory(story_id, like_count.length);
    }
  } catch (error) {
    console.error("Error updating like count:", error);
    throw new ClientError("Failed to update like count");
  }

  return res.status(200).json({
    status: true,
    message: "Successfully deleted like",
  });
};
