import InvariantError from "../../utils/exceptions/InvariantError";
import { payloadPostSchema, payloadPutSchema } from "./schema";

const StoryValidation = {
  validatePayloadPostStory(payload) {
    const { error } = payloadPostSchema.validate(payload);
    if (error) throw new InvariantError(error.message);
  },
  validatePayloadPutStory(payload) {
    const { error } = payloadPutSchema.validate(payload);
    if (error) throw new InvariantError(error.message);
  },
};

export default StoryValidation;
