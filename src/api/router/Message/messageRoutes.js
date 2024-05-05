import express from "express";
import { authCheck } from "../../middlewares/authGuard";
import { catchAsync } from "../../../utils";
import createMessage from "../../controllers/Message/createMessage";
import getMessageById from "../../controllers/Message/getMessageById";
import getMessages from "../../controllers/Message/getMessages";
import deletMessageById from "../../controllers/Message/deleteMessageById";
import updateMessageById from "../../controllers/Message/updateMessageById";

const message_routes = express.Router();

message_routes.post("/messages", authCheck, catchAsync(createMessage));
message_routes.get("/messages", authCheck, catchAsync(getMessages));
message_routes.get("/messages/:id", authCheck, catchAsync(getMessageById));
message_routes.put("/messages/:id", authCheck, catchAsync(updateMessageById));
message_routes.delete("/messages/:id", authCheck, catchAsync(deletMessageById));

export default message_routes;
