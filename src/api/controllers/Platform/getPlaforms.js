import { request, response } from "express";
import platformService from "../../../lib/services/Platform";

const getPlatforms = async (req = request, res = response) => {
  const platforms = await platformService.getPlatforms();

  return res.status(200).json({
    status: true,
    message: "Get platforms successfully",
    data: platforms,
  });
};

export default getPlatforms;
