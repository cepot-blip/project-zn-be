import { request, response } from "express";
import tokenize from "../../../utils/tokenize";
import notificationService from "../../../lib/services/Notification";

const getNotifications = async (req = request, res = response) => {
  const { page = 1, limit: take = 10 } = req.query;
  const skip = (page - 1) * take;

  const token = req.headers["authorization"];
  const { id: user_id } = await tokenize.decodeJWT(token);

  const totalNotification =
    await notificationService.getTotalNotificationsByUserId(user_id);

  const totalPage = Math.ceil(totalNotification / take);

  const next = page * take < totalNotification;
  const prev = skip > 0;

  const params = {
    user_id,
    skip: Number(skip),
    take: Number(take),
  };

  const notifications = await notificationService.getNotificationsByUserId(
    params
  );

  return res.status(200).json({
    success: true,
    message: "Get notifications successfully",
    data: notifications,
    pagination: {
      total_page: totalPage,
      current_page: Number(page),
      next,
      prev,
    },
  });
};

export default getNotifications;
