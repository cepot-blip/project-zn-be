import express from "express";
import { createCategory } from "../../controllers/Category/createCategory";
import { getCategories } from "../../controllers/Category/getCategories";
import { getCategorybyId } from "../../controllers/Category/getCategorybyId";
import { updateCategory } from "../../controllers/Category/updateCategory";
import { deleteCategory } from "../../controllers/Category/deleteCategory";

const category_routes = express.Router();

category_routes.post("/category/", createCategory);
category_routes.get("/category/", getCategories);
category_routes.get("/category/:id", getCategorybyId);
category_routes.put("/category/:id", updateCategory);
category_routes.delete("/category/:id", deleteCategory);

export default category_routes;
