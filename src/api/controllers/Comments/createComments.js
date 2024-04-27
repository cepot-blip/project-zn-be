import { request, response } from "express";
import env from "dotenv";
import { JWTValue } from "../../middlewares/getTokenValue";
import {
  CommentModels,
  UsersModels,
  StoryModels,
} from "../../../models/Models";

env.config();

export const createComments = async (req = request, res = response) => {
  try {
    const { story_id, content } = await req.body;

    const userJWTTokenValue = await JWTValue(req, res);
    const user_id = userJWTTokenValue.id;

    const checkStoryId = await StoryModels.findUnique({
      where: {
        id: parseInt(story_id),
      },
    });

    if (!checkStoryId) {
      return res.status(400).json({
        status: false,
        message: "Story does't existed",
      });
    }

    const checkUserId = await UsersModels.findUnique({
      where: {
        id: parseInt(user_id),
      },
    });

    if (!checkUserId) {
      return res.status(400).json({
        status: false,
        message: "User does't existed",
      });
    }

    await CommentModels.create({
      data: {
        user_id: checkUserId.id,
        story_id: checkStoryId.id,
        content: content,
      },
    });

    return res.status(201).json({
      status: true,
      message: "Successfully created comment",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
