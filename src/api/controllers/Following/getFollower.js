import { request, response } from "express";
import followingService from "../../../lib/services/Following";
import userService from "../../../lib/services/User";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const getFollower = async (req = request, res = response) => {
  const { userId: follower_user_id } = req.params;

  const checkUserId = await userService.checkUserbyId(
    parseInt(follower_user_id)
  );
  if (!checkUserId) {
    throw new NotFoundError("User not found, put valid ID");
  }

  const result = await followingService.getFollower(parseInt(follower_user_id));

  return res.status(200).json({
    status: true,
    message: "Get follower successfully",
    total_data: result.length,
    query: result,
  });
};
