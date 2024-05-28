import { response, request } from "express";
import tokenize from "../../../utils/tokenize";
import followingService from "../../../lib/services/Following";

export const getUserFollowingbyUserId = async (
  req = request,
  res = response
) => {
  const user_id = parseInt(req.params.userId);

  const jwtToken = req.headers.authorization;
  const loginUser = await tokenize.decodeJWT(jwtToken);

  if (user_id === loginUser.id) {
    return res
      .status(400)
      .json({ status: false, message: "You cannot follow yourself" });
  }
  const checkUserFollowing = await followingService.checkFollowing(
    user_id,
    loginUser.id
  );

  if (checkUserFollowing) {
    return res.status(200).json({ status: true, message: "User is following" });
  }
  return res
    .status(400)
    .json({ status: false, message: "User is not following" });
};
