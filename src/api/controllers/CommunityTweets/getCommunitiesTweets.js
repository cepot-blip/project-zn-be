import { request, response } from "express";
import CommunityTweetsService from "../../../lib/services/CommunityTweets";

export const getCommunityTweets = async (req = request, res = response) => {
  const community_id = parseInt(req.params.community_id);
  const { page = 1, limit = 10 } = await req.query;
  let offset = (page - 1) * limit;

  const totalDataCommunityTweets =
    await CommunityTweetsService.totalDataCommunityTweets();

  const totalPages = Math.ceil(totalDataCommunityTweets / limit);

  const next = offset + limit < totalDataCommunityTweets;
  const prev = offset > 0;

  const result = await CommunityTweetsService.getCommunityTweets(community_id);

  return res.status(200).json({
    status: true,
    message: "Successfully get community tweets",
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
