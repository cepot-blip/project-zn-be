import { request, response } from "express";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import { avatarModel } from "../../../models/Models";

const deleteAvatarById = async (req = request, res = response) => {
  const { id } = req.params;

  const avatar = await avatarModel.findUnique({ where: { id: parseInt(id) } });
  if (!avatar) {
    throw new NotFoundError("Avatar not found, put valid id");
  }

  await avatarModel.delete({ where: { id: parseInt(id) } });

  return res.status(200).json({
    status: true,
    message: "Successfully deleted avatar",
  });
};

export default deleteAvatarById;
