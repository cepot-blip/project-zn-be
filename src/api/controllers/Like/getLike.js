import { request, response } from "express";
import likeService from "../../../lib/services/Like";

export const getLike = async (req = request, res = response) => {
  const result = await likeService.getLikes();

  return res.status(201).json({
    status: true,
    message: "Get like successfully",
    query: result,
  });
};
