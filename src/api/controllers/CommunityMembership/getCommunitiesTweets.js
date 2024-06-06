import { request, response } from "express";
import CommunityMembershipService from "../../../lib/services/CommunityMembership";

export const getCommunityMembers = async (req = request, res = response) => {
  const community_id = parseInt(req.params.community_id);
  const { page = 1, limit = 10 } = await req.query;
  let offset = (page - 1) * limit;

  const totalDataCommunityMember =
    await CommunityMembershipService.totalDataCommunityMembership(community_id);

  const totalPages = Math.ceil(totalDataCommunityMember / limit);

  const next = offset + limit < totalDataCommunityMember;
  const prev = offset > 0;

  const result = await CommunityMembershipService.getCommunityMembership(
    community_id
  );

  return res.status(200).json({
    status: true,
    message: "Successfully get community members",
    pagination: {
      total_pages: totalPages,
      limit: parseInt(limit),
      current_page: parseInt(page),
      next: next,
      prev: prev,
    },
    query: result,
  });
};
