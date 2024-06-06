import express from "express";
import { catchAsync } from "../../../utils/index";
import { createCommunityMembership } from "../../controllers/CommunityMembership/createCommunityM";
import { getCommunityMembers } from "../../controllers/CommunityMembership/getCommunitiesTweets";
import { deleteCommunityMember } from "../../controllers/CommunityMembership/deleteCommunityMembers";
import { authCheck } from "../../middlewares/authGuard";

const community_membership_routes = express.Router();

community_membership_routes.post(
  "/community/:community_id/member",
  authCheck,
  catchAsync(createCommunityMembership)
);
community_membership_routes.get(
  "/community/:community_id/member",
  authCheck,
  catchAsync(getCommunityMembers)
);
community_membership_routes.delete(
  "/community/:community_id/member",
  authCheck,
  catchAsync(deleteCommunityMember)
);

export default community_membership_routes;
