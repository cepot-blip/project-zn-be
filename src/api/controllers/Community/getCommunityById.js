import { request, response } from "express";
import CommunityService from "../../../lib/services/Community";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const getCommunityById = async (req = request, res = response) => {
  const id = parseInt(req.params.community_id);

  const result = await CommunityService.getCommunityById(id);
  if (!result) {
    throw new NotFoundError("Community not found");
  }

  return res.status(200).json({
    status: true,
    message: "Successfully get community",
    query: result,
  });
};
