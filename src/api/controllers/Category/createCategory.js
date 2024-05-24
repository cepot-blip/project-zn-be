import { request, response } from "express";
import categoryService from "../../../lib/services/Category";
import CategoryValidation from "../../../validation/Category";
import InvariantError from "../../../utils/exceptions/InvariantError";

export const createCategory = async (req = request, res = response) => {
  const { category_name } = await req.body;
  CategoryValidation.validatePayloadCategory({ category_name });

  const checkCategoryDuplicate = await categoryService.getCategorybyName(
    category_name
  );
  console.log(checkCategoryDuplicate);
  if (checkCategoryDuplicate) {
    throw new InvariantError("Category already exist");
  }

  const newCategory = await categoryService.createCategory(category_name);

  return res.status(201).json({
    status: true,
    message: "Successfully create category",
    query: {
      id: newCategory.id,
      category_name: newCategory.category_name,
    },
  });
};
