import { request, response } from "express";
import CommunityService from "../../../lib/services/Community";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import tokenize from "../../../utils/tokenize";
import userService from "../../../lib/services/User";
import CommunityMembershipService from "../../../lib/services/CommunityMembership";

export const deleteCommunityMember = async (req = request, res = response) => {
  const community_id = parseInt(req.params.community_id);

  const jwtToken = req.headers.authorization;
  const { id: user_id } = await tokenize.decodeJWT(jwtToken);

  const checkUser = await userService.getUserById(user_id);
  if (!checkUser) {
    throw new NotFoundError("User not found");
  }

  const checkCommunity = await CommunityService.getCommunityById(community_id);
  if (!checkCommunity) {
    throw new NotFoundError("Community not found");
  }

  await CommunityMembershipService.deleteCommunityMembership(
    community_id,
    user_id
  );

  return res
    .status(200)
    .json({ status: true, message: "Successfully leave community" });
};
