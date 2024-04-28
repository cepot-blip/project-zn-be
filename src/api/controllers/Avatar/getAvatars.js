import { request, response } from "express";
import avatarService from "../../../lib/services/Avatar";

const getAvatars = async (req = request, res = response) => {
  const avatars = await avatarService.getAvatars();

  return res.status(200).json({
    status: true,
    message: "Get avatars successfully",
    data: avatars,
  });
};

export default getAvatars;
