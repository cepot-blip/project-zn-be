import express from "express";
import { catchAsync } from "../../../utils/index";
import { createCommunityTweet } from "../../controllers/CommunityTweets/createCommunityTweet";
import { getCommunityTweets } from "../../controllers/CommunityTweets/getCommunitiesTweets";
import { getCommunityTweetById } from "../../controllers/CommunityTweets/getCommunityById";
import { deleteCommunityTweet } from "../../controllers/CommunityTweets/deleteCommunityTweet";
import { authCheck } from "../../middlewares/authGuard";

const community_tweet_routes = express.Router();

community_tweet_routes.post(
  "/community/:community_id/tweets/:story_id",
  authCheck,
  catchAsync(createCommunityTweet)
);
community_tweet_routes.get(
  "/community/:community_id/tweets",
  authCheck,
  catchAsync(getCommunityTweets)
);
community_tweet_routes.get(
  "/community/:community_id/tweets/:tweet_id",
  authCheck,
  catchAsync(getCommunityTweetById)
);
community_tweet_routes.delete(
  "/community/:community_id/tweets/:tweet_id",
  authCheck,
  catchAsync(deleteCommunityTweet)
);

export default community_tweet_routes;
