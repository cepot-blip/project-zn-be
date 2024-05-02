import { request, response } from "express";
import tokenize from "../../../utils/tokenize";
import storyService from "../../../lib/services/Story";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import reactionService from "../../../lib/services/Reaction";

const deleteReaction = async (req = request, res = response) => {
  const token = req.headers["authorization"];
  const { id: user_id } = await tokenize.decodeJWT(token);

  const { id: story_id } = req.params;

  const story = await storyService.getStoryById(Number(story_id));
  if (!story) {
    throw new NotFoundError("Story not found, put valid id");
  }

  const checkAvailableReaction = await reactionService.checkAvailableReaction({
    story_id: Number(story_id),
    user_id,
  });

  if (!checkAvailableReaction) {
    throw new NotFoundError("Reaction not found, put valid payload");
  }

  await reactionService.deleteReaction({
    story_id: Number(story_id),
    user_id,
  });

  return res.status(200).json({
    status: true,
    message: "Reaction deleted successfully",
  });
};

export default deleteReaction;
