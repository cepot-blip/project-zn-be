import { request, response } from "express";
import tokenize from "../../../utils/tokenize";
import storyService from "../../../lib/services/Story";
import categoryService from "../../../lib/services/Category";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import AuthorizationError from "../../../utils/exceptions/AuthorizationError";
import StoryValidation from "../../../validation/Story";

export const updateStory = async (req = request, res = response) => {
  const { id } = req.params;
  const { title, content, category_id } = req.body;
  StoryValidation.validatePayloadStory({
    title,
    content,
    category_id,
  });

  const jwtToken = req.headers.authorization;
  const { user_id } = await tokenize.decodeJWT(jwtToken);

  const checkStorybyId = await storyService.getStoryById(parseInt(id));
  if (!checkStorybyId) {
    throw new NotFoundError("Story not found, put valid id");
  }

  const verifyStorybyUserId = await storyService.checkAvailabilityStoryByUserId(
    parseInt(id),
    user_id
  );
  if (!verifyStorybyUserId)
    throw new AuthorizationError("User not authorized to access");

  const checkCategory = await categoryService.getCategoryById(
    parseInt(category_id)
  );
  if (!checkCategory) {
    throw new NotFoundError("Category not found, put valid id");
  }

  const data = { user_id, title, content, category_id };
  await storyService.updateStory(parseInt(id), data);

  return res.status(200).json({
    status: true,
    message: "Successfully updated story",
  });
};
