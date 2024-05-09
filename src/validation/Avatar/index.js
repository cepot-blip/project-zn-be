import InvariantError from "../../utils/exceptions/InvariantError";
import { payloadPostSchema, payloadPutSchema } from "./schema";

const AvatarValidation = {
  validatePayloadPostAvatar(payload) {
    const { error } = payloadPostSchema.validate(payload);
    if (error) throw new InvariantError(error.message);
  },
  validatePayloadPutAvatar(payload) {
    const { error } = payloadPutSchema.validate(payload);
    if (error) throw new InvariantError(error.message);
  },
};

export default AvatarValidation;
