import { request, response } from "express";
import storyService from "../../../lib/services/Story";

export const getStories = async (req = request, res = response) => {
  const { page = 1, limit = 10 } = await req.query;
  let offset = (page - 1) * limit;

  const totalCountStory = await storyService.totalStoryData();

  const totalPages = Math.ceil(totalCountStory / limit);

  const next = offset + limit < totalCountStory;
  const prev = offset > 0;

  const result = await storyService.getStory(offset, limit);

  return res.status(200).json({
    status: true,
    message: "Get story successfully",
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
