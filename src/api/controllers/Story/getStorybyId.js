import { request, response } from "express";
import env from "dotenv";
import { StoryModels } from "../../../models/Models";

env.config();

export const getStorybyId = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const result = await StoryModels.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        category: {
          select: {
            category_name: true,
          },
        },
      },
    });

    if (!result) {
      return res.status(400).json({
        status: false,
        message: "Story does't existed",
      });
    }

    return res.status(200).json({
      status: true,
      query: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
