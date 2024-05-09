import { request, response } from "express";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import avatarService from "../../../lib/services/Avatar";
import AvatarValidation from "../../../validation/Avatar";
import tokenize from "../../../utils/tokenize";
import AuthorizationError from "../../../utils/exceptions/AuthorizationError";

const updateAvatarById = async (req = request, res = response) => {
  const { id } = req.params;
  const { image_link } = req.body;

  AvatarValidation.validatePayloadPutAvatar({ image_link });

  const avatar = await avatarService.getAvatarById(Number(id));
  if (!avatar) {
    throw new NotFoundError("Avatar not found, put valid id");
  }

  const token = req.headers["authorization"];
  const { id: user_id } = await tokenize.decodeJWT(token);
  const checkOwnerAvatar = await avatarService.checkOwnerAvatar(
    avatar.id,
    user_id
  );

  if (!checkOwnerAvatar) {
    throw new AuthorizationError("User not authorized to access");
  }

  await avatarService.updateAvatarById(Number(id), { image_link });

  return res.status(200).json({
    status: true,
    message: "Successfully update avatar",
  });
};

export default updateAvatarById;
