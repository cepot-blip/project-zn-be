import { request, response } from "express";
import tagService from "../../../lib/services/Tag";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const getTagbyId = async (req = request, res = response) => {
  const { id } = req.params;

  const result = await tagService.getTagById(parseInt(id));
  if (!result) {
    throw new NotFoundError("Tag not found, put valid ID");
  }

  return res.status(200).json({
    status: true,
    message: "Get tag successfully",
    query: result,
  });
};
