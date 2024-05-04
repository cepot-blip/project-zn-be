import express from "express";
import { authCheck } from "../../middlewares/authGuard";
import { catchAsync } from "../../../utils";
import addOrDeleteBookmark from "../../controllers/Bookmark/addOrDeleteBookmark";
import getBookmarks from "../../controllers/Bookmark/getBookmarks";

const bookmark_routes = express.Router();

bookmark_routes.put(
  "/stories/:id/bookmarks",
  authCheck,
  catchAsync(addOrDeleteBookmark)
);

bookmark_routes.get("/bookmarks", authCheck, catchAsync(getBookmarks));

export default bookmark_routes;
