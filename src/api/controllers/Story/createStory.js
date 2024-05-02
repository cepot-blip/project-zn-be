import { request, response } from "express";
import tokenize from "../../../utils/tokenize";
import storyService from "../../../lib/services/Story";
import categoryService from "../../../lib/services/Category";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import StoryValidation from "../../../validation/Story";

export const createStory = async (req = request, res = response) => {
  try {
    const { title, content, like_count, category_id } = await req.body;
    StoryValidation.validatePayloadStory({
      title,
      content,
      like_count,
      category_id,
    });

    const token = await req.headers.authorization;
    const { id: user_id } = await tokenize.decodeJWT(token);

    const checkCategoryById = await categoryService.getCategoryById(
      category_id
    );
    if (!checkCategoryById) {
      throw new NotFoundError("Category not found, put valid id");
    }

    const data = {
      user_id,
      title,
      content,
      like_count,
      category_id,
    };
    await storyService.createStory(data);

    return res.status(201).json({
      status: true,
      message: "Successfully created story",
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};
