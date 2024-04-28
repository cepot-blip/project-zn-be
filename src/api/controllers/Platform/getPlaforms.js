import { request, response } from "express";
import { platformModel } from "../../../models/Models";

const getPlatforms = async (req = request, res = response) => {
  const platforms = await platformModel.findMany();

  return res.status(200).json({
    status: true,
    message: "Get platforms successfully",
    data: platforms,
  });
};

export default getPlatforms;
