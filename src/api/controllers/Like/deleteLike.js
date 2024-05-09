import { request, response } from "express";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import likeService from "../../../lib/services/Like";

export const deleteLike = async (req = request, res = response) => {
  const { id } = req.params;

  const checkLikeId = await likeService.getLikeById(parseInt(id));
  if (!checkLikeId) {
    throw new NotFoundError("Like not found, put valid id");
  }

  await likeService.deleteLike(parseInt(id));

  return res.status(200).json({
    status: true,
    message: "Successfully deleted like",
  });
};
