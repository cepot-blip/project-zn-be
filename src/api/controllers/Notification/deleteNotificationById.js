import { request, response } from "express";
import notificationService from "../../../lib/services/Notification";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import tokenize from "../../../utils/tokenize";
import AuthorizationError from "../../../utils/exceptions/AuthorizationError";

const deleteNotificationById = async (req = request, res = response) => {
  const { id } = req.params;

  const notification = await notificationService.getNotificationById(
    Number(id)
  );

  if (!notification) {
    throw new NotFoundError("Notification not found, put valid id");
  }

  const token = req.headers["authorization"];
  const { id: user_id } = await tokenize.decodeJWT(token);

  if (notification.user_id !== user_id) {
    throw new AuthorizationError("User not authorized to access");
  }

  await notificationService.deleteNotificationById(Number(id));

  return res.status(200).json({
    status: true,
    message: "Successfully deleted notification",
  });
};

export default deleteNotificationById;