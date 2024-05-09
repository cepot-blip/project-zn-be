import InvariantError from "../../utils/exceptions/InvariantError";
import { payloadSchema } from "./schema";

const NotificationValidation = {
  validateNotificationPayload(payload) {
    const { error } = payloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
};

export default NotificationValidation;
