import Joi from "joi";
import { TAG_NAME } from "@prisma/client";

const payloadSchema = Joi.object({
  tag_name: Joi.string()
    .valid(...Object.values(TAG_NAME))
    .required()
    .messages({
      "any.required": "tag_name is required",
    }),
});

export { payloadSchema };
