import { request, response } from "express";
import tokenize from "../../../utils/tokenize";
import storyService from "../../../lib/services/Story";
import categoryService from "../../../lib/services/Category";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import StoryValidation from "../../../validation/Story";

export const createStory = async (req = request, res = response) => {
  const { content, image_link = null, category_id = null } = await req.body;
  StoryValidation.validatePayloadStory({
    content,
    image_link,
    category_id,
  });

  const token = await req.headers.authorization;
  const { id: user_id } = await tokenize.decodeJWT(token);

  const checkCategoryById =
    category_id != null
      ? await categoryService.getCategoryById(category_id)
      : null;
  if (!checkCategoryById && category_id != null) {
    throw new NotFoundError("Category not found, put valid id");
  }

  const data = {
    user_id,
    content,
    image_link,
    like_count: 0,
    category_id,
  };
  await storyService.createStory(data);

  return res.status(201).json({
    status: true,
    message: "Successfully created story",
  });
};
