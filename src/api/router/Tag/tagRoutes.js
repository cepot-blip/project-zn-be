import express from "express";
import { createTag } from "../../controllers/Tag/createTag";
import { getTags } from "../../controllers/Tag/getTags";
import { getTagbyId } from "../../controllers/Tag/getTagbyId";
import { updateTag } from "../../controllers/Tag/updateTag";
import { deleteTag } from "../../controllers/Tag/deleteTag";
import { catchAsync } from "../../../utils";

const tag_routes = express.Router();

tag_routes.post("/tag", catchAsync(createTag));
tag_routes.get("/tag", catchAsync(getTags));
tag_routes.get("/tag/:id", catchAsync(getTagbyId));
tag_routes.put("/tag/:id", catchAsync(updateTag));
tag_routes.delete("/tag/:id", catchAsync(deleteTag));

export default tag_routes;
