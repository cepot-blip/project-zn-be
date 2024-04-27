import { request, response } from "express";
import env from "dotenv";
import { CategoryModels } from "../../../models/Models";

env.config();

export const getCategorybyId = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const result = await CategoryModels.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!result) {
      return res.status(401).json({
        status: false,
        message: "Category doesn't existed",
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
