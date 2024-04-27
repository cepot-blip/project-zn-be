import express from "express";
import {
  createComments,
  getComments,
  getCommentsbyId,
  updateComments,
  deleteComments,
} from "../../controllers/Comments";
import { authCheck } from "../../middlewares/authGuard";

const comments_routes = express.Router();

comments_routes.post("/comments/create", authCheck, createComments);
comments_routes.get("/comments/get", authCheck, getComments);
comments_routes.get("/comments/get-byid/:id", authCheck, getCommentsbyId);
comments_routes.put("/comments/update/:id", authCheck, updateComments);
comments_routes.delete("/comments/delete/:id", authCheck, deleteComments);

export default comments_routes;
