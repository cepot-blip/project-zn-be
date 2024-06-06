import { request, response } from "express";
import CommunityService from "../../../lib/services/Community";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const updateCommunity = async (req = request, res = response) => {
  const id = parseInt(req.params.community_id);

  const checkCommunity = await CommunityService.getCommunityById(id);
  if (!checkCommunity) {
    throw new NotFoundError("Community not found");
  }
  const data = {
    name: req.body.name ? req.body.name : checkCommunity.name,
    description: req.body.description
      ? req.body.description
      : checkCommunity.description,
  };

  await CommunityService.updateCommunity(id, data);
  return res
    .status(200)
    .json({ status: true, message: "Successfully update community" });
};
