import { request, response } from "express";
import env from "dotenv";
import { JWTValue } from "../../middlewares/getTokenValue";
import { CommentModels, StoryModels } from "../../../models/Models";

env.config();

export const updateComments = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { story_id, content } = req.body;

    const userJWTTokenValue = await JWTValue(req, res);
    const user_id = userJWTTokenValue.id;

    const checkCommentId = await CommentModels.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!checkCommentId) {
      return res.status(400).json({
        status: false,
        message: "Comment does't existed",
      });
    }

    if (checkCommentId.user_id !== parseInt(user_id)) {
      return res.status(403).json({
        status: false,
        message: "User not authorized",
      });
    }

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

    await CommentModels.update({
      where: {
        id: parseInt(checkCommentId.id),
      },
      data: {
        user_id: checkCommentId.user_id,
        story_id: checkStoryId.id,
        content: content,
      },
    });

    return res.status(200).json({
      status: true,
      message: "Successfully update comment",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
