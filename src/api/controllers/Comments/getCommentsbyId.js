import { request, response } from "express";
import commentService from "../../../lib/services/Comment";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const getCommentsbyId = async (req = request, res = response) => {
  const { storyId: story_id, id } = req.params;

  const result = await commentService.getCommentById(
    parseInt(id),
    parseInt(story_id)
  );
  if (!result) {
    throw new NotFoundError("Comment not found, put valid id");
  }

  return res.status(200).json({
    status: true,
    message: "Get comment successfully",
    query: result,
  });
};
