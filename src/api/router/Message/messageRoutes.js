import express from "express";
import { authCheck } from "../../middlewares/authGuard";
import { catchAsync } from "../../../utils";
import createMessage from "../../controllers/Message/createMessage";
import getMessageSendById from "../../controllers/Message/getMessageSendById";
import getMessagesBySender from "../../controllers/Message/getMessagesBySender";
import deleteMessageSendById from "../../controllers/Message/deleteMessageSendById";
import updateMessageSendById from "../../controllers/Message/updateMessageSendById";
import getMessagesByReceiver from "../../controllers/Message/getMessagesByReceiver";
import deleteMessageReceiveById from "../../controllers/Message/deleteMessageReceiveById";
import getMessageReceiveById from "../../controllers/Message/getMessageReceiveById";
import readOrUnreadMessageReceiveById from "../../controllers/Message/readMessageReceiveById";

const message_routes = express.Router();

message_routes.post("/messages", authCheck, catchAsync(createMessage));
message_routes.get(
  "/messages/sender",
  authCheck,
  catchAsync(getMessagesBySender)
);
message_routes.get(
  "/messages/receiver",
  authCheck,
  catchAsync(getMessagesByReceiver)
);
message_routes.get(
  "/messages/:id/sender",
  authCheck,
  catchAsync(getMessageSendById)
);
message_routes.get(
  "/messages/:id/receiver",
  authCheck,
  catchAsync(getMessageReceiveById)
);
message_routes.put(
  "/messages/:id/sender",
  authCheck,
  catchAsync(updateMessageSendById)
);
message_routes.delete(
  "/messages/:id/sender",
  authCheck,
  catchAsync(deleteMessageSendById)
);
message_routes.delete(
  "/messages/:id/receiver",
  authCheck,
  catchAsync(deleteMessageReceiveById)
);
message_routes.put(
  "/messages/:id/receiver/readOrUnread",
  authCheck,
  catchAsync(readOrUnreadMessageReceiveById)
);

export default message_routes;
