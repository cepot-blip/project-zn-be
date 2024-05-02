import express from "express";
import { authCheck } from "../../middlewares/authGuard";
import { catchAsync } from "../../../utils";
import createOrUpdateReaction from "../../controllers/Reaction/createOrUpdateReaction";
import deleteReaction from "../../controllers/Reaction/deleteReaction";

const reaction_routes = express.Router();

reaction_routes.put(
  "/stories/:id/reactions",
  authCheck,
  catchAsync(createOrUpdateReaction)
);

reaction_routes.delete(
  "/stories/:id/reactions",
  authCheck,
  catchAsync(deleteReaction)
);

export default reaction_routes;
