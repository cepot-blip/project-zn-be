import { request, response } from "express";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import tokenize from "../../../utils/tokenize";
import followingService from "../../../lib/services/Following";
import userService from "../../../lib/services/User";
import ClientError from "../../../utils/exceptions/ClientError";
import { number } from "joi";
import FollowingValidation from "../../../validation/Following";

export const addFollowing = async (req = request, res = response) => {
  const { userId: following_user_id } = req.params;

  const jwtToken = req.headers.authorization;
  const { id: follower_user_id } = await tokenize.decodeJWT(jwtToken);

  FollowingValidation.validatePayloadFollowing({
    following_user_id,
    follower_user_id,
  });

  const checkUserId = await userService.getUserById(
    parseInt(following_user_id)
  );
  if (!checkUserId) {
    throw new NotFoundError("User not found, put valid ID");
  }

  if (parseInt(follower_user_id) == parseInt(following_user_id)) {
    throw new ClientError("You cannot follow yourself");
  }

  const checkAvailabilityFollowing = await followingService.checkFollowing(
    parseInt(following_user_id),
    parseInt(follower_user_id)
  );
  if (checkAvailabilityFollowing) {
    throw new ClientError("You have followed this user");
  }

  await followingService.createFollowing(
    parseInt(following_user_id),
    parseInt(follower_user_id)
  );
  return res.status(201).json({
    status: true,
    message: "Successfully add following",
  });
};
