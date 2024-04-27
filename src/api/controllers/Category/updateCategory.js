import { request, response } from "express";
import env from "dotenv";
import { CategoryModels } from "../../../models/Models";
import { Category_name } from "@prisma/client";

env.config();

export const updateCategory = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { category_name, description } = req.body;

    const isvalidCategoryName =
      Object.values(Category_name).includes(category_name);

    if (!isvalidCategoryName) {
      return res.status(401).json({
        status: false,
        message: "Category name doesn't existed",
      });
    }

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

    await CategoryModels.update({
      where: {
        id: parseInt(id),
      },
      data: {
        category_name: category_name,
        description: description,
      },
    });

    return res.status(200).json({
      status: true,
      message: "Successfully update category",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
