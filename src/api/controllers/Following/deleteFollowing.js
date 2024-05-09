import { request, response } from "express";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import followingService from "../../../lib/services/Following";

export const deleteFollowing = async (req = request, res = response) => {
  const { userId: following_user_id, id } = req.params;

  const checkFollowingId = await followingService.getFollowingById(
    parseInt(id),
    parseInt(following_user_id)
  );
  if (!checkFollowingId) {
    throw new NotFoundError("Following not found, put valid ID");
  }

  await followingService.deleteFollowing(parseInt(id));

  return res.status(200).json({
    status: true,
    message: "Successfully deleted following",
  });
};
