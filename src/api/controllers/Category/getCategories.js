import { request, response } from "express";
import env from "dotenv";
import { CategoryModels } from "../../../models/Models";

env.config();

export const getCategories = async (req = request, res = response) => {
  try {
    const result = await CategoryModels.findMany();

    return res.status(200).json({
      status: true,
      query: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
