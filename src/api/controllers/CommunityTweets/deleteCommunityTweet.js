import { request, response } from "express";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import CommunityTweetsService from "../../../lib/services/CommunityTweets";

export const deleteCommunityTweet = async (req = request, res = response) => {
  const id = parseInt(req.params.tweet_id);

  const checkCommunityTweets =
    await CommunityTweetsService.getCommunityTweetsById(id);
  if (!checkCommunityTweets) {
    throw new NotFoundError("Community tweets not found");
  }

  await CommunityTweetsService.deleteCommunityTweets(id);

  return res
    .status(200)
    .json({ status: true, message: "Successfully delete community tweet" });
};
