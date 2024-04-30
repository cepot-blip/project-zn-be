import { request, response } from "express";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import { avatarModel } from "../../../models/Models";
import InvariantError from "../../../utils/exceptions/InvariantError";
import avatarService from "../../../lib/services/Avatar";

const updateAvatarById = async (req = request, res = response) => {
  const { id } = req.params;
  const { image_link } = req.body;

  if (!image_link) {
    throw new InvariantError("Image link is required");
  }

  const avatar = await avatarService.getAvatarById(Number(id));
  if (!avatar) {
    throw new NotFoundError("Avatar not found, put valid id");
  }

  await avatarService.updateAvatarById(Number(id), { image_link });

  return res.status(200).json({
    status: true,
    message: "Successfully update avatar",
  });
};

export default updateAvatarById;
