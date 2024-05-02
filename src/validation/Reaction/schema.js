import { REACTION_TYPE } from "@prisma/client";
import Joi from "joi";

const payloadSchema = Joi.object({
  reaction_type: Joi.string()
    .valid(...Object.values(REACTION_TYPE))
    .required(),
});

export { payloadSchema };
