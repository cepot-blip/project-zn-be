import { request, response } from "express";
import env from "dotenv";
import { CategoryModels } from "../../../models/Models";

env.config();

export const deleteCategory = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const checkCategoryId = await CategoryModels.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!checkCategoryId) {
      return res.status(401).json({
        status: false,
        message: "Category doesn't existed",
      });
    }

    await CategoryModels.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({
      status: true,
      message: "Successfully deleted category",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
