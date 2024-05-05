import { response, request } from "express";
import messageService from "../../../lib/services/Message";
import tokenize from "../../../utils/tokenize";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import AuthorizationError from "../../../utils/exceptions/AuthorizationError";

const deleteMessageSendById = async (req = request, res = response) => {
  const { id } = req.params;
  const token = req.headers["authorization"];
  const { id: sender_user_id } = await tokenize.decodeJWT(token);

  const message = await messageService.getMessageById(Number(id));

  if (!message) {
    throw new NotFoundError("Message not found, put valid id");
  }

  const verifyOwnerMessage = await messageService.verifyOwnerMessageSend({
    id: Number(id),
    sender_user_id,
  });

  if (!verifyOwnerMessage) {
    throw new AuthorizationError("User not authorized to access");
  }

  await messageService.deleteMessageById(Number(id));
  return res.status(200).json({
    status: true,
    message: "Successfully deleted sent message",
  });
};

export default deleteMessageSendById;
