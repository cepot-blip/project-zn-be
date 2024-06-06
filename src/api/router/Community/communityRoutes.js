import express from "express";
import { catchAsync } from "../../../utils/index";
import { deleteCommunity } from "../../controllers/Community/deleteCommunity";
import { updateCommunity } from "../../controllers/Community/updateCommunity";
import { getCommunityById } from "../../controllers/Community/getCommunityById";
import { getCommunities } from "../../controllers/Community/getCommunities";
import { createCommunity } from "../../controllers/Community/createCommunity";
import { authCheck } from "../../middlewares/authGuard";

const community_routes = express.Router();

community_routes.post("/community/", authCheck, catchAsync(createCommunity));
community_routes.get("/community/", authCheck, catchAsync(getCommunities));
community_routes.get(
  "/community/:community_id",
  authCheck,
  catchAsync(getCommunityById)
);
community_routes.put(
  "/community/:community_id",
  authCheck,
  catchAsync(updateCommunity)
);
community_routes.delete(
  "/community/:community_id",
  authCheck,
  catchAsync(deleteCommunity)
);

export default community_routes;
