import { request, response } from "express";
import messageService from "../../../lib/services/Message";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

const getMessageById = async (req = request, res = response) => {
  const { id } = req.params;
  const message = await messageService.getMessageById(Number(id));
  if (!message) {
    throw new NotFoundError("Message not found, put valid id");
  }

  return res.status(200).json({
    status: true,
    message: "Get message successfully",
    data: message,
  });
};

export default getMessageById;
