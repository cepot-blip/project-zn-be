import InvariantError from "../../utils/exceptions/InvariantError";
import { payloadSchema } from "./schema";

const ReactionValidation = {
  validatePayloadReaction(payload) {
    const { error } = payloadSchema.validate(payload);
    if (error) throw new InvariantError(error.message);
  },
};

export default ReactionValidation;
