import { response, request } from "express";
import messageService from "../../../lib/services/Message";
import tokenize from "../../../utils/tokenize";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import AuthorizationError from "../../../utils/exceptions/AuthorizationError";
import MessageValidation from "../../../validation/Message";
import userService from "../../../lib/services/User";

const updateMessageSendById = async (req = request, res = response) => {
  const { id } = req.params;
  MessageValidation.validatePayloadPutMessage(req.body);

  const token = req.headers["authorization"];
  const { id: sender_user_id } = await tokenize.decodeJWT(token);

  const message = await messageService.getMessageById(Number(id));

  if (!message) {
    throw new NotFoundError("Message not found, put valid id");
  }

  const checkValidSenderUserId = await userService.getUserById(sender_user_id);
  const checkValidReceiverUserId = await userService.getUserById(
    message.receiver_user_id
  );

  if (!checkValidSenderUserId || !checkValidReceiverUserId) {
    throw new NotFoundError("User not found, put valid id");
  }

  const verifyOwnerMessage = await messageService.verifyOwnerMessageSend({
    id: Number(id),
    sender_user_id,
  });

  if (!verifyOwnerMessage) {
    throw new AuthorizationError("User not authorized to access");
  }

  await messageService.updateMessageById(Number(id), req.body);
  return res.status(200).json({
    status: true,
    message: "Successfully updated message",
  });
};

export default updateMessageSendById;
