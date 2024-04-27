import { request, response } from "express";
import env from "dotenv";
import { StoryModels } from "../../../models/Models";
import { JWTValue } from "../../middlewares/getTokenValue";

env.config();

export const deleteStory = async (req = request, res = response) => {
  try {
    const { id } = req.params;

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

    await StoryModels.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({
      status: true,
      message: "Successfully delete story",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
