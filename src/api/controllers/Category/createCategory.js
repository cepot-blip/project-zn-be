import { request, response } from "express";
import env from "dotenv";
import { CategoryModels } from "../../../models/Models";
import { Category_name } from "@prisma/client";

env.config();

export const createCategory = async (req = request, res = response) => {
  try {
    const { category_name, description } = await req.body;

    const isvalidCategoryName =
      Object.values(Category_name).includes(category_name);

    if (!isvalidCategoryName) {
      return res.status(401).json({
        status: false,
        message: "Category name doesn't existed",
      });
    }

    const checkExistingCategory = await CategoryModels.count({
      where: {
        category_name: category_name,
      },
    });

    if (checkExistingCategory == 1) {
      return res.status(401).json({
        status: false,
        message: "Category name have been used",
      });
    }

    await CategoryModels.create({
      data: {
        category_name: category_name,
        description: description,
      },
    });

    return res.status(201).json({
      status: true,
      message: "Category created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
