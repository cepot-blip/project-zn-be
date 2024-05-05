import { response, request } from "express";
import messageService from "../../../lib/services/Message";
import tokenize from "../../../utils/tokenize";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import AuthorizationError from "../../../utils/exceptions/AuthorizationError";

const deleteMessageReceiveById = async (req = request, res = response) => {
  const { id } = req.params;
  const token = req.headers["authorization"];
  const { id: receiver_user_id } = await tokenize.decodeJWT(token);

  const message = await messageService.getMessageById(Number(id));

  if (!message) {
    throw new NotFoundError("Message not found, put valid id");
  }

  const verifyOwnerMessage = await messageService.verifyOwnerMessageReceive({
    id: Number(id),
    receiver_user_id,
  });

  if (!verifyOwnerMessage) {
    throw new AuthorizationError("User not authorized to access");
  }

  await messageService.deleteMessageById(Number(id));
  return res.status(200).json({
    status: true,
    message: "Successfully deleted received message",
  });
};

export default deleteMessageReceiveById;
