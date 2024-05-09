import express from "express";
import { addFollowing } from "../../controllers/Following/addFollowing";
import { getFollowing } from "../../controllers/Following/getFollowing";
import { getFollower } from "../../controllers/Following/getFollower";
import { deleteFollowing } from "../../controllers/Following/deleteFollowing";
import { authCheck } from "../../middlewares/authGuard";
import { catchAsync } from "../../../utils";

const following_routes = express.Router();

following_routes.post(
  "/users/:userId/following",
  authCheck,
  catchAsync(addFollowing)
);
following_routes.get(
  "/users/:userId/following",
  authCheck,
  catchAsync(getFollowing)
);
following_routes.get(
  "/users/:userId/follower",
  authCheck,
  catchAsync(getFollower)
);
following_routes.delete(
  "/users/:userId/following/:id",
  authCheck,
  catchAsync(deleteFollowing)
);

export default following_routes;
