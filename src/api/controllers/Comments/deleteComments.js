import { request, response } from "express";
import env from "dotenv";
import { JWTValue } from "../../middlewares/getTokenValue";
import { CommentModels } from "../../../models/Models";

env.config();

export const deleteComments = async (req = request, res = response) => {
  try {
    const { id } = req.params;

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

    await CommentModels.delete({
      where: {
        id: parseInt(checkCommentId.id),
      },
    });

    return res.status(200).json({
      status: true,
      message: "Successfully delete comment",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
