import { request, response } from "express";
import reStoryService from "../../../lib/services/ReStory";

export const getReStory = async (req = request, res = response) => {
  const { page = 1, limit = 10 } = await req.query;

  const result = await reStoryService.getReStory();

  let offset = (page - 1) * limit;

  const totalPages = Math.ceil(result.length / limit);

  const next = offset + limit < result.length;
  const prev = offset > 0;

  return res.status(200).json({
    status: true,
    message: "Get reStory successfully",
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
