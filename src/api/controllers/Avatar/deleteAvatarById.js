import { request, response } from "express";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import avatarService from "../../../lib/services/Avatar";

const deleteAvatarById = async (req = request, res = response) => {
  const { id } = req.params;

  const avatar = await avatarService.getAvatarById(Number(id));
  if (!avatar) {
    throw new NotFoundError("Avatar not found, put valid id");
  }

  await avatarService.deleteAvatarById(Number(id));

  return res.status(200).json({
    status: true,
    message: "Successfully deleted avatar",
  });
};

export default deleteAvatarById;
