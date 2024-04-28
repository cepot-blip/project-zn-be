import { request, response } from "express";
import { platformModel } from "../../../models/Models";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

const getPlatformById = async (req = request, res = response) => {
  const { id } = req.params;

  const platform = await platformModel.findUnique({
    where: {
      id: parseInt(id),
    },
  });

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
