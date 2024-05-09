import { request, response } from "express";
import reStoryService from "../../../lib/services/ReStory";

export const getReStorybyId = async (req = request, res = response) => {
  const { id } = req.params;

  const result = await reStoryService.getReStoryById(parseInt(id));

  return res.status(200).json({
    status: true,
    message: "Get reStory successfully",
    query: result,
  });
};
