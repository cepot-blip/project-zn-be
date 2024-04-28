import { request, response } from "express";
import { avatarModel } from "../../../models/Models";

const getAvatars = async (req = request, res = response) => {
  const avatars = await avatarModel.findMany();

  return res.status(200).json({
    status: true,
    message: "Get avatars successfully",
    data: avatars,
  });
};

export default getAvatars;
