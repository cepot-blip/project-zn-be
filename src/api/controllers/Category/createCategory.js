import { request, response } from "express";
import categoryService from "../../../lib/services/Category";
import CategoryValidation from "../../../validation/Category";

export const createCategory = async (req = request, res = response) => {
  const { category_name, description } = await req.body;
  CategoryValidation.validatePayloadCategory({ category_name, description });

  const data = { category_name, description };
  await categoryService.createCategory(data);
  return res.status(201).json({
    status: true,
    message: "Successfully create category",
  });
};
