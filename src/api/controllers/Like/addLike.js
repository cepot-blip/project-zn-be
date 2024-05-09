import { request, response } from "express";
import storyService from "../../../lib/services/Story";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import tokenize from "../../../utils/tokenize";
import likeService from "../../../lib/services/Like";
import ClientError from "../../../utils/exceptions/ClientError";
import LikeValidation from "../../../validation/Like";

export const addLike = async (req = request, res = response) => {
  const { storyId: story_id } = req.params;

  const jwtToken = req.headers.authorization;
  const { id: user_id } = await tokenize.decodeJWT(jwtToken);

  LikeValidation.validatePayloadLike({ user_id, story_id });

  const checkStoryId = await storyService.getStoryById(parseInt(story_id));
  if (!checkStoryId) {
    throw new NotFoundError("Story not found, put valid id");
  }

  const checkAvailabilityLike = await likeService.checkAvailabilityLike(
    parseInt(user_id),
    parseInt(story_id)
  );
  if (checkAvailabilityLike) {
    throw new ClientError("You have liked this story");
  }

  await likeService.addLike(parseInt(user_id), parseInt(story_id));
  return res.status(201).json({
    status: true,
    message: "Successfully add like",
  });
};
