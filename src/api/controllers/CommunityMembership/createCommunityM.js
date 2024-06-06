import { request, response } from "express";
import tokenize from "../../../utils/tokenize";
import userService from "../../../lib/services/User";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import CommunityService from "../../../lib/services/Community";
import CommunityMembershipService from "../../../lib/services/CommunityMembership";
import ClientError from "../../../utils/exceptions/ClientError";

export const createCommunityMembership = async (
  req = request,
  res = response
) => {
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

  const checkMembership = await CommunityMembershipService.checkUserMembership(
    community_id,
    user_id
  );
  if (checkMembership) {
    throw new ClientError("You have already join this community");
  }

  const data = { community_id, user_id };
  await CommunityMembershipService.createCommunityMembership(data);
  return res
    .status(201)
    .json({ status: true, message: "Successfully join community" });
};
