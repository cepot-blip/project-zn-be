import express from "express";
import {
  createCategory,
  getCategories,
  getCategorybyId,
  updateCategory,
  deleteCategory,
} from "../../controllers/Category";

const category_routes = express.Router();

category_routes.post("/category/create", createCategory);
category_routes.get("/category/get", getCategories);
category_routes.get("/category/get-byid/:id", getCategorybyId);
category_routes.put("/category/update/:id", updateCategory);
category_routes.delete("/category/delete/:id", deleteCategory);

export default category_routes;
