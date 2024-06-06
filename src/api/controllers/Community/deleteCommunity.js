import { request, response } from "express";
import CommunityService from "../../../lib/services/Community";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const deleteCommunity = async (req = request, res = response) => {
  const id = parseInt(req.params.community_id);

  const checkCommunity = await CommunityService.getCommunityById(id);
  if (!checkCommunity) {
    throw new NotFoundError("Community not found");
  }

  await CommunityService.deleteCommunity(id);

  return res
    .status(200)
    .json({ status: true, message: "Successfully delete community" });
};
