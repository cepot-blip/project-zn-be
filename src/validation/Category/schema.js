import Joi from "joi";
import { Category_name } from "@prisma/client";

const payloadSchema = Joi.object({
  category_name: Joi.string()
    .valid(...Object.values(Category_name))
    .required()
    .messages({
      "any.required": "category_name is required",
    }),
  description: Joi.string().required().messages({
    "any.required": "description is required",
  }),
});

export { payloadSchema };
