import { request, response } from "express";
import categoryService from "../../../lib/services/Category";

export const getCategories = async (req = request, res = response) => {
  const result = await categoryService.getCategories();

  return res.status(200).json({
    status: true,
    message: "Get category successfully",
    query: result,
  });
};
