import { request, response } from "express";
import storyService from "../../../lib/services/Story";
import commentService from "../../../lib/services/Comment";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import tokenize from "../../../utils/tokenize";
import CommentValidation from "../../../validation/Comment";

export const createComments = async (req = request, res = response) => {
  const { storyId: story_id } = req.params;
  const { content } = await req.body;
  CommentValidation.validatePayloadComment({ content });

  const jwtToken = req.headers.authorization;
  const { id } = await tokenize.decodeJWT(jwtToken);

  const checkStoryId = await storyService.getStoryById(parseInt(story_id));
  if (!checkStoryId) {
    throw new NotFoundError("Story not found, put valid id");
  }

  await commentService.createComment(id, parseInt(story_id), content);

  return res.status(201).json({
    status: true,
    message: "Successfully creat comment",
  });
};
