import { request, response } from "express";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import reStoryService from "../../../lib/services/ReStory";

export const deleteReStory = async (req = request, res = response) => {
  const { id } = req.params;

  const checkReStoryId = await reStoryService.getReStoryById(parseInt(id));
  if (!checkReStoryId) {
    throw new NotFoundError("ReStory not found, put valid ID");
  }

  await reStoryService.deleteReStory(parseInt(id));

  return res.status(200).json({
    status: true,
    message: "Successfully deleted reStory",
  });
};
