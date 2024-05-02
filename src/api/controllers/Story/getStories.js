import { request, response } from "express";
import storyService from "../../../lib/services/Story";
export const getStories = async (req = request, res = response) => {
  const { page = 1, limit = 10 } = await req.query;
  let skip = (page - 1) * limit;

  const totalCountStory = await storyService.totalStoryData();
  const totalPages = Math.ceil(totalCountStory / limit);

  const result = await storyService.getStory(skip, limit);

  return res.status(200).json({
    status: true,
    message: "Get story successfully",
    total_data: totalCountStory,
    limit: parseInt(limit),
    page: parseInt(page),
    total_pages: totalPages,
    query: result,
  });
};
