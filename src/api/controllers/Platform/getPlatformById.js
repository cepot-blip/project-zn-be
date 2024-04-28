import { request, response } from "express";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import platformService from "../../../lib/services/Platform";

const getPlatformById = async (req = request, res = response) => {
  const { id } = req.params;

  const platform = await platformService.getPlatformById(Number(id));

  if (!platform) {
    throw new NotFoundError("Platform not found, put valid id");
  }

  return res.status(200).json({
    status: true,
    message: "Get platform successfully",
    data: platform,
  });
};

export default getPlatformById;
