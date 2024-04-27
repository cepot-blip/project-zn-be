import { request, response } from "express";
import env from "dotenv";
import { JWTValue } from "../../middlewares/getTokenValue";
import { StoryModels, UsersModels } from "../../../models/Models";

env.config();

export const getStories = async (req = request, res = response) => {
  try {
    const userJWTTokenValue = await JWTValue(req, res);
    const user_id = userJWTTokenValue.id;

    const checkUserId = await UsersModels.findUnique({
      where: {
        id: parseInt(user_id),
      },
    });

    if (!checkUserId) {
      return res.status(400).json({
        status: false,
        message: "User doesn't existed ",
      });
    }

    const result = await StoryModels.findMany({
      orderBy : {id : "desc"},
      include: {
        category: {
          select: {
            category_name: true,
          },
        },
      },
    });

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
