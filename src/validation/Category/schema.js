import Joi from "joi";
import { CATEGORY_NAME } from "@prisma/client";

const payloadSchema = Joi.object({
  category_name: Joi.string()
    .valid(...Object.values(CATEGORY_NAME))
    .required()
    .messages({
      "any.required": "category_name is required",
    }),
});

export { payloadSchema };
