import express from "express";
import { authCheck } from "../../middlewares/authGuard";
import { catchAsync } from "../../../utils";
import createNotification from "../../controllers/Notification/createNotification";
import getNotifications from "../../controllers/Notification/getNotifications";
import getNotificationById from "../../controllers/Notification/getNotificationById";
import deleteNotificationById from "../../controllers/Notification/deleteNotificationById";
const notification_routes = express.Router();

notification_routes.post(
  "/notifications",
  authCheck,
  catchAsync(createNotification)
);

notification_routes.get(
  "/notifications",
  authCheck,
  catchAsync(getNotifications)
);

notification_routes.get(
  "/notifications/:id",
  authCheck,
  catchAsync(getNotificationById)
);

notification_routes.delete(
  "/notifications/:id",
  authCheck,
  catchAsync(deleteNotificationById)
);

export default notification_routes;
