import { request, response } from "express";
import storyService from "../../../lib/services/Story";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const getStorybyId = async (req = request, res = response) => {
  const { id } = req.params;

  const result = await storyService.getStoryById(parseInt(id));
  if (!result) {
    throw new NotFoundError("Story not found, put valid id");
  }

  return res.status(200).json({
    status: true,
    query: result,
  });
};
