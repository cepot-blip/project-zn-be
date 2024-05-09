import { request, response } from "express";
import tagService from "../../../lib/services/Tag";
import TagValidation from "../../../validation/Tag";

export const createTag = async (req = request, res = response) => {
  const { tag_name } = req.body;
  TagValidation.validatePayloadTag({ tag_name });

  await tagService.createTag(tag_name);
  return res.status(201).json({
    status: true,
    message: "Successfully create tag",
  });
};
