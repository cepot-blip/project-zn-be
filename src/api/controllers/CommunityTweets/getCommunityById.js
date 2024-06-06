import { request, response } from "express";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import CommunityTweetsService from "../../../lib/services/CommunityTweets";

export const getCommunityTweetById = async (req = request, res = response) => {
  const id = parseInt(req.params.tweet_id);

  const result = await CommunityTweetsService.getCommunityTweetsById(id);
  if (!result) {
    throw new NotFoundError("Community tweet not found");
  }

  return res.status(200).json({
    status: true,
    message: "Successfully get community tweet",
    query: result,
  });
};
