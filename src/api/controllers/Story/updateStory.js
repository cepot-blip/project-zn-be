import { request, response } from "express";
import env from "dotenv";
import { JWTValue } from "../../middlewares/getTokenValue";
import {
  StoryModels,
  UsersModels,
  CategoryModels,
} from "../../../models/Models";

env.config();

export const updateStory = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { title, content, category_id } = req.body;

    const userJWTTokenValue = await JWTValue(req, res);
    const user_id = userJWTTokenValue.id;

    const checkStoryId = await StoryModels.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!checkStoryId) {
      return res.status(400).json({
        status: false,
        message: "Story does't existed",
      });
    }

    if (checkStoryId.user_id !== parseInt(user_id)) {
      return res.status(403).json({
        status: false,
        message: "User not authorized",
      });
    }

    const checkCategoryId = await CategoryModels.findUnique({
      where: {
        id: parseInt(category_id),
      },
    });

    if (!checkCategoryId) {
      return res.status(400).json({
        status: false,
        message: "Category doesn't existed",
      });
    }

    await StoryModels.update({
      where: {
        id: parseInt(id),
      },
      data: {
        user_id: checkStoryId.user_id,
        title: title,
        content: content,
        category_id: parseInt(category_id),
      },
    });

    return res.status(200).json({
      status: true,
      message: "Successfully updated story",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
