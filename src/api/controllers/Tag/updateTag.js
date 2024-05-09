import { request, response } from "express";
import tagService from "../../../lib/services/Tag";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import TagValidation from "../../../validation/Tag";

export const updateTag = async (req = request, res = response) => {
  const { id } = req.params;
  const { tag_name } = req.body;
  TagValidation.validatePayloadTag({ tag_name });

  const checkTagId = await tagService.getTagById(parseInt(id));
  if (!checkTagId) {
    throw new NotFoundError("Tag not found, put valid id");
  }

  await tagService.updateTag(parseInt(id), tag_name);

  return res.status(200).json({
    status: true,
    message: "Successfully update tag",
  });
};
