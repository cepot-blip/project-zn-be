import { request, response } from "express";
import categoryService from "../../../lib/services/Category";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;

  const checkCategoryId = await categoryService.getCategoryById(parseInt(id));
  if (!checkCategoryId) {
    throw new NotFoundError("Category not found, put valid ID");
  }

  await categoryService.deleteCategory(parseInt(id));

  return res.status(200).json({
    status: true,
    message: "Successfully deleted category",
  });
};
