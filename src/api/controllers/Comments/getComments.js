import { request, response } from "express";
import commentService from "../../../lib/services/Comment";

export const getComments = async (req = request, res = response) => {
  const { storyId: story_id } = req.params;

  const { page = 1, limit = 10 } = await req.query;
  let offset = (page - 1) * limit;

  const totalCountStory = await commentService.totalCommentData();

  const totalPages = Math.ceil(totalCountStory / limit);

  const next = offset + limit < totalCountStory;
  const prev = offset > 0;

  const result = await commentService.getComments(
    parseInt(story_id),
    offset,
    limit
  );

  return res.status(200).json({
    status: true,
    message: "Get comment successfully",
    pagination: {
      total_pages: totalPages,
      limit: parseInt(limit),
      current_page: parseInt(page),
      next: next,
      prev: prev,
    },
    query: result,
  });
};
