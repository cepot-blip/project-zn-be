const { request, response } = require("express");
const { default: tokenize } = require("../../../utils/tokenize");
const { default: ReactionValidation } = require("../../../validation/Reaction");
const { default: storyService } = require("../../../lib/services/Story");
const {
  default: NotFoundError,
} = require("../../../utils/exceptions/NotFoundError");
const { default: reactionService } = require("../../../lib/services/Reaction");

const createOrUpdateReaction = async (req = request, res = response) => {
  const token = await req.headers["authorization"];
  const { id: user_id } = await tokenize.decodeJWT(token);

  const { id: story_id } = req.params;

  const { reaction_type } = await req.body;
  ReactionValidation.validatePayloadReaction({
    reaction_type,
  });

  const story = storyService.getStoryById(Number(story_id));

  if (!story) {
    throw new NotFoundError("Story not found, put valid id");
  }

  const checkAvailableReaction = await reactionService.checkAvailableReaction({
    user_id,
    story_id: Number(story_id),
  });

  const payload = {
    reaction_type,
    story_id: Number(story_id),
    user_id,
  };

  if (!checkAvailableReaction) {
    await reactionService.createReaction(payload);
    return res.status(201).json({
      status: true,
      message: "Successfully create reaction",
    });
  }

  await reactionService.updateReactionById(
    checkAvailableReaction.id,
    reaction_type
  );
  return res.status(200).json({
    status: true,
    message: "Successfully update reaction",
  });
};

export default createOrUpdateReaction;
