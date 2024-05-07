import { request, response } from "express";
import categoryService from "../../../lib/services/Category";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const getCategorybyId = async (req = request, res = response) => {
  const { id } = req.params;

  const result = await categoryService.getCategoryById(parseInt(id));
  if (!result) {
    throw new NotFoundError("Category not found, put valid ID");
  }

  return res.status(200).json({
    status: true,
    message: "Get category successfully",
    query: result,
  });
};
