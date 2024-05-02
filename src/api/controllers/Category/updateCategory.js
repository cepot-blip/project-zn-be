import { request, response } from "express";
import categoryService from "../../../lib/services/Category";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import CategoryValidation from "../../../validation/Category";

export const updateCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const { category_name, description } = req.body;
  CategoryValidation.validatePayloadCategory({ category_name, description });

  const checkCategoryId = await categoryService.getCategoryById(parseInt(id));
  if (!checkCategoryId) {
    throw new NotFoundError("Category not found, put valid id");
  }

  await categoryService.updateCategory(parseInt(id), {
    category_name,
    description,
  });

  return res.status(200).json({
    status: true,
    message: "Successfully update category",
  });
};
