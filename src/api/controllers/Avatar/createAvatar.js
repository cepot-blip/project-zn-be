import { request, response } from "express";
import tokenize from "../../../utils/tokenize";
import InvariantError from "../../../utils/exceptions/InvariantError";
import avatarService from "../../../lib/services/Avatar";

const createAvatar = async (req = request, res = response) => {
  const token = await req.headers["authorization"];
  const { id: user_id, email } = await tokenize.decodeJWT(token);

  const checkAvailableAvatarByUserId = await avatarService.getAvatarByUserId(
    user_id
  );

  if (checkAvailableAvatarByUserId) {
    throw new InvariantError("You already have an avatar");
  }

  let { image_link } = req.body;
  if (!image_link) {
    image_link = `${process.env.DICEBAR_IMAGE_URL}=${email}`;
  }

  const data = {
    image_link,
    user_id,
  };

  await avatarService.createAvatar(data);
  return res
    .status(201)
    .json({ status: true, message: "Successfully create avatar" });
};

export default createAvatar;
