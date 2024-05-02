import { request, response } from "express";
import commentService from "../../../lib/services/Comment";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import tokenize from "../../../utils/tokenize";
import CommentValidation from "../../../validation/Comment";

export const updateComments = async (req = request, res = response) => {
  const { storyId: story_id, id } = req.params;
  const { content } = req.body;
  CommentValidation.validatePayloadComment({ content });

  const jwtToken = req.headers.authorization;
  const { id: user_id } = await tokenize.decodeJWT(jwtToken);

  const checkCommentbyId = await commentService.getCommentById(
    parseInt(id),
    parseInt(story_id)
  );
  if (!checkCommentbyId) {
    throw new NotFoundError("Comment/Story not found, put valid id");
  }

  const verifyCommentbyUserId =
    await commentService.checkAvailabilityCommentByUserId(
      parseInt(id),
      parseInt(user_id),
      parseInt(story_id)
    );
  if (!verifyCommentbyUserId) {
    throw new AuthorizationError("User not authorized to access");
  }

  await commentService.updateCommentById(
    parseInt(id),
    parseInt(story_id),
    content
  );

  return res.status(200).json({
    status: true,
    message: "Successfully update comment",
  });
};
