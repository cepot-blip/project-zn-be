import { request, response } from "express";
import tagService from "../../../lib/services/Tag";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const deleteTag = async (req = request, res = response) => {
  const { id } = req.params;

  const checkTagId = await tagService.getTagById(parseInt(id));
  if (!checkTagId) {
    throw new NotFoundError("Tag not found, put valid ID");
  }

  await tagService.deleteTag(parseInt(id));

  return res.status(200).json({
    status: true,
    message: "Successfully deleted tag",
  });
};
