import { request, response } from "express";
import categoryService from "../../../lib/services/Category";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import CategoryValidation from "../../../validation/Category";
import InvariantError from "../../../utils/exceptions/InvariantError";

export const updateCategory = async (req = request, res = response) => {
  const id = parseInt(req.params.id);
  const { category_name } = req.body;
  CategoryValidation.validatePayloadCategory({ category_name });

  const checkCategoryId = await categoryService.getCategoryById(id);
  if (!checkCategoryId) {
    throw new NotFoundError("Category not found, put valid id");
  }
  const checkCategoryDuplicate = await categoryService.getCategorybyName(
    category_name
  );
  if (checkCategoryDuplicate) {
    throw new InvariantError("Category already exist");
  }

  await categoryService.updateCategory(id, {
    category_name,
  });

  return res.status(200).json({
    status: true,
    message: "Successfully update category",
  });
};
