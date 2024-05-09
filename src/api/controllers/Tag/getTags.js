import { request, response } from "express";
import tagService from "../../../lib/services/Tag";

export const getTags = async (req = request, res = response) => {
  const result = await tagService.getTag();

  return res.status(200).json({
    status: true,
    message: "Get tag successfully",
    query: result,
  });
};
