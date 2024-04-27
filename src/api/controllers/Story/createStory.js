import { request, response } from "express";
import env from "dotenv";
import { JWTValue } from "../../middlewares/getTokenValue";
import {
  StoryModels,
  CategoryModels,
  UsersModels,
} from "../../../models/Models";

env.config();

export const createStory = async (req = request, res = response) => {
  try {
    const { title, content, category_id } = await req.body;

    const userJWTTokenValue = await JWTValue(req, res);
    const user_id = userJWTTokenValue.id;

    const checkUserId = await UsersModels.findUnique({
      where: {
        id: parseInt(user_id),
      },
    });

    if (!checkUserId) {
      return res.status(401).json({
        status: false,
        message: "User not found",
      });
    }

    const checkCategoryId = await CategoryModels.findUnique({
      where: {
        id: parseInt(category_id),
      },
    });

    if (!checkCategoryId) {
      return res.status(401).json({
        status: false,
        message: "Category not found",
      });
    }

    await StoryModels.create({
      data: {
        user_id: checkUserId.id,
        title: title,
        content: content,
        category_id: checkCategoryId.id,
      },
    });

    return res.status(201).json({
      status: true,
      message: "Successfully created story",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
