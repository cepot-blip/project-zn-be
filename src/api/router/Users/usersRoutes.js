import express from "express";
import {
  authUsers,
  changePasswordUsers,
  createUsers,
  deleteUsers,
  getUsers,
  getUsersById,
  loginUsers,
  updateUsers,
} from "../../controllers/Users";
import rateLimit from "express-rate-limit";
import { authCheck } from "../../middlewares/authGuard";
import { catchAsync } from "../../../utils";

const users_routes = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too much pressing the screen please wait a while longer !!",
});

users_routes.post("/users/create", catchAsync(createUsers));
users_routes.post("/users/login", limiter, catchAsync(loginUsers));
users_routes.post("/users/get", authCheck, catchAsync(getUsers));
users_routes.get("/users/get-byid/:id", authCheck, catchAsync(getUsersById));
users_routes.put("/users/update", authCheck, catchAsync(updateUsers));
users_routes.delete("/users/:id", authCheck, catchAsync(deleteUsers));
users_routes.get("/users/auth", catchAsync(authUsers));
users_routes.put(
  "/users/change-password",
  authCheck,
  catchAsync(changePasswordUsers)
);

export default users_routes;
