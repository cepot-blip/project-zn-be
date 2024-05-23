import { request, response } from "express";
import storyService from "../../../lib/services/Story";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import tokenize from "../../../utils/tokenize";
import likeService from "../../../lib/services/Like";
import ClientError from "../../../utils/exceptions/ClientError";

export const addLike = async (req = request, res = response) => {
  const story_id = parseInt(req.params.storyId);

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

  await likeService.addLike(user_id, story_id);
  const like_count = await likeService.totalLikebyStoryId(story_id);

  const data = { like_count: like_count };
  if (like_count) {
    await storyService.updateStory(story_id, data);
  }

  return res.status(201).json({
    status: true,
    message: "Successfully add like",
  });
};
