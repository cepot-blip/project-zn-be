import express from "express";
import { createCategory } from "../../controllers/Category/createCategory";
import { getCategories } from "../../controllers/Category/getCategories";
import { getCategorybyId } from "../../controllers/Category/getCategorybyId";
import { updateCategory } from "../../controllers/Category/updateCategory";
import { deleteCategory } from "../../controllers/Category/deleteCategory";
import { catchAsync } from "../../../utils/index";

const category_routes = express.Router();

category_routes.post("/category/", catchAsync(createCategory));
category_routes.get("/category/", catchAsync(getCategories));
category_routes.get("/category/:id", catchAsync(getCategorybyId));
category_routes.put("/category/:id", catchAsync(updateCategory));
category_routes.delete("/category/:id", catchAsync(deleteCategory));

export default category_routes;
