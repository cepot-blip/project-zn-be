import { request, response } from "express";
import tokenize from "../../../utils/tokenize";
import commentService from "../../../lib/services/Comment";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import AuthorizationError from "../../../utils/exceptions/AuthorizationError";

export const deleteComments = async (req = request, res = response) => {
  const { storyId: story_id, id } = req.params;

  const jwtToken = req.headers.authorization;
  const { id: user_id } = await tokenize.decodeJWT(jwtToken);

  const checkCommentId = await commentService.getCommentById(parseInt(id));
  if (!checkCommentId) {
    throw new NotFoundError("Comment not found, put valid id");
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

  await commentService.deleteComment(parseInt(id), parseInt(story_id));

  return res.status(200).json({
    status: true,
    message: "Successfully delete comment",
  });
};
