import { request, response } from "express";
import storyService from "../../../lib/services/Story";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import tokenize from "../../../utils/tokenize";
import likeService from "../../../lib/services/Like";
import ClientError from "../../../utils/exceptions/ClientError";
import LikeValidation from "../../../validation/Like";

export const addLike = async (req = request, res = response) => {
  const { storyId } = req.params;
  const story_id = parseInt(storyId);

  const jwtToken = req.headers.authorization;
  const { id: user_id } = await tokenize.decodeJWT(jwtToken);

  const checkStory = await storyService.getStoryById(story_id);
  if (!checkStory) {
    throw new NotFoundError("Story not found");
  }

  const checkLike = await likeService.checkAvailabilityLike(user_id, story_id);
  if (checkLike) {
    throw new ClientError("You already like this story");
  }

  try {
    await likeService.addLike(user_id, story_id);
    const like_count = await likeService.getStoryLikes(story_id);

    if (like_count && like_count.length > 0) {
      await storyService.updateLikeStory(story_id, like_count.length);
    }
  } catch (error) {
    console.error("Error updating like count:", error);
    throw new ClientError("Failed to update like count");
  }

  return res.status(201).json({
    status: true,
    message: "Successfully add like",
  });
};
