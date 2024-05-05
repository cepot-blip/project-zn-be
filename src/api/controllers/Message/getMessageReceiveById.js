import { request, response } from "express";
import messageService from "../../../lib/services/Message";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import tokenize from "../../../utils/tokenize";
import AuthorizationError from "../../../utils/exceptions/AuthorizationError";

const getMessageReceiveById = async (req = request, res = response) => {
  const { id } = req.params;
  const message = await messageService.getMessageById(Number(id));

  if (!message) {
    throw new NotFoundError("Message not found, put valid id");
  }

  const token = req.headers["authorization"];
  const { id: receiver_user_id } = await tokenize.decodeJWT(token);

  const verifyOwnerMessage = await messageService.verifyOwnerMessageReceive({
    id: Number(id),
    receiver_user_id,
  });

  if (!verifyOwnerMessage) {
    throw new AuthorizationError("User not authorized to access");
  }

  return res.status(200).json({
    status: true,
    message: "Get message receive successfully",
    data: message,
  });
};

export default getMessageReceiveById;
