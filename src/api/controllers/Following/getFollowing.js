import { request, response } from "express";
import followingService from "../../../lib/services/Following";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import userService from "../../../lib/services/User";

export const getFollowing = async (req = request, res = response) => {
  const { userId: following_user_id } = req.params;

  const checkUserId = await userService.checkUserbyId(
    parseInt(following_user_id)
  );
  if (!checkUserId) {
    throw new NotFoundError("User not found, put valid ID");
  }

  const result = await followingService.getFollowing(
    parseInt(following_user_id)
  );

  return res.status(200).json({
    status: true,
    message: "Get following successfully",
    total_data: result.length,
    query: result,
  });
};
