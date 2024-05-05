import InvariantError from "../../utils/exceptions/InvariantError";
import { payloadPostSchema, payloadPutSchema } from "./schema";

const MessageValidation = {
  validatePayloadPostMessage(payload) {
    const { error } = payloadPostSchema.validate(payload);
    if (error) throw new InvariantError(error.message);
  },
  validatePayloadPutMessage(payload) {
    const { error } = payloadPutSchema.validate(payload);
    if (error) throw new InvariantError(error.message);
  },
};

export default MessageValidation;
