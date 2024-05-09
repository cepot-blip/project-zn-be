import InvariantError from "../../utils/exceptions/InvariantError";
import { payloadSchema } from "./schema";

const TagValidation = {
  validatePayloadTag(payload) {
    const { error } = payloadSchema.validate(payload);
    if (error) throw new InvariantError(error.message);
  },
};

export default TagValidation;
