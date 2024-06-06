import { request, response } from "express";
import CommunityService from "../../../lib/services/Community";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import storyService from "../../../lib/services/Story";
import CommunityTweetsService from "../../../lib/services/CommunityTweets";

export const createCommunityTweet = async (req = request, res = response) => {
  const community_id = parseInt(req.params.community_id);
  const story_id = parseInt(req.params.story_id);

  const checkCommunity = await CommunityService.getCommunityById(community_id);
  if (!checkCommunity) {
    throw new NotFoundError("Community not found");
  }

  const checkStory = await storyService.getStoryById(story_id);
  if (!checkStory) {
    throw new NotFoundError("Story not found");
  }

  await CommunityTweetsService.createCommunityTweets(community_id, story_id);
  return res
    .status(201)
    .json({ status: true, message: "Successfully create community tweets" });
};
