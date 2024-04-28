import { request, response } from "express";
import { avatarModel } from "../../../models/Models";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

const getAvatarById = async (req = request, res = response) => {
  const { id } = req.params;

  const avatar = await avatarModel.findUnique({ where: { id: parseInt(id) } });

  if (!avatar) {
    throw new NotFoundError("Avatar not found, put valid id");
  }

  return res
    .status(200)
    .json({ status: true, message: "Get avatar successfully", data: avatar });
};

export default getAvatarById;
