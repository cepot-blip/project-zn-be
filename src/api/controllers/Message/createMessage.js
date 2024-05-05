import { request, response } from "express";
import userService from "../../../lib/services/User";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import messageService from "../../../lib/services/Message";
import MessageValidation from "../../../validation/Message";
import tokenize from "../../../utils/tokenize";

const createMessage = async (req = request, res = response) => {
  const { receiver_user_id } = req.body;
  MessageValidation.validatePayloadPostMessage(req.body);

  const token = req.headers["authorization"];
  const { id: sender_user_id } = await tokenize.decodeJWT(token);

  const checkValidSenderUserId = await userService.getUserById(sender_user_id);
  const checkValidReceiverUserId = await userService.getUserById(
    receiver_user_id
  );

  if (!checkValidSenderUserId || !checkValidReceiverUserId) {
    throw new NotFoundError("User not found, put valid id");
  }

  const payload = {
    sender_user_id,
    ...req.body,
  };

  await messageService.createMessage(payload);
  return res.status(201).json({
    status: true,
    message: "Message created successfully",
  });
};
export default createMessage;
