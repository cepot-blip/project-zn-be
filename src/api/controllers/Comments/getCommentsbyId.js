import { request, response } from "express";
import env from "dotenv";
import { CommentModels } from "../../../models/Models";

env.config();

export const getCommentsbyId = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const result = await CommentModels.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!result) {
      return res.status(400).json({
        status: false,
        message: "Comment does't existed",
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
