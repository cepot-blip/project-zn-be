import { request, response } from "express";
import NotificationValidation from "../../../validation/Notification";
import notificationService from "../../../lib/services/Notification";
import userService from "../../../lib/services/User";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

const createNotification = async (req = request, res = response) => {
  NotificationValidation.validateNotificationPayload(req.body);
  const { notificationContent, user_id } = req.body;

  const checkAvailableUserId = await userService.getUserById(Number(user_id));

  if (!checkAvailableUserId) {
    throw new NotFoundError("User not found, put valid id");
  }

  const payload = {
    user_id: Number(user_id),
    notificationContent,
    notificationDate: new Date(),
  };

  await notificationService.createNotification(payload);
  return res.status(201).json({
    status: true,
    message: "Notification created successfully",
  });
};

export default createNotification;
