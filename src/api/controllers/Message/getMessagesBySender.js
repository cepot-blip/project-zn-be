import { request, response } from "express";
import tokenize from "../../../utils/tokenize";
import messageService from "../../../lib/services/Message";

const getMessagesBySender = async (req = request, res = response) => {
  const { page = 1, limit: take = 10 } = await req.query;
  const skip = (page - 1) * take;

  const token = req.headers["authorization"];
  const { id: user_id } = await tokenize.decodeJWT(token);

  const totalMessage = await messageService.getTotalMessageSendByUserId(
    user_id
  );

  const totalPage = Math.ceil(totalMessage / take);

  const next = take * page < totalMessage;
  const prev = skip > 0;

  const params = {
    user_id,
    skip: Number(skip),
    take: Number(take),
  };
  const messages = await messageService.getMessageSendByUserId(params);

  return res.status(200).json({
    status: true,
    message: "Get messages by sender successfully",
    data: messages,
    pagination: {
      total_page: totalPage,
      current_page: Number(page),
      total_data: totalMessage,
      next,
      prev,
    },
  });
};

export default getMessagesBySender;
