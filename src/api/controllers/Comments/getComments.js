import { request, response } from "express";
import commentService from "../../../lib/services/Comment";

export const getComments = async (req = request, res = response) => {
  const { storyId: story_id } = req.params;

  const { page = 1, limit = 10 } = await req.query;
  let skip = (page - 1) * limit;

  const totalCountStory = await commentService.totalCommentData();
  const totalPages = Math.ceil(totalCountStory / limit);

  const result = await commentService.getComments(
    parseInt(story_id),
    skip,
    limit
  );

  return res.status(200).json({
    status: true,
    message: "Get comment successfully",
    total_data: totalCountStory,
    limit: parseInt(limit),
    page: parseInt(page),
    total_pages: totalPages,
    query: result,
  });
};
