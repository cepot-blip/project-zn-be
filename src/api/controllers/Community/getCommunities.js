import { request, response } from "express";
import CommunityService from "../../../lib/services/Community";

export const getCommunities = async (req = request, res = response) => {
  const { page = 1, limit = 10 } = await req.query;
  let offset = (page - 1) * limit;

  const totalDataCommunity = await CommunityService.totalDataCommunity();

  const totalPages = Math.ceil(totalDataCommunity / limit);

  const next = offset + limit < totalDataCommunity;
  const prev = offset > 0;

  const result = await CommunityService.getCommunity();

  return res.status(200).json({
    status: true,
    message: "Successfully get communities",
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
