import Joi from "joi";

const payloadSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "name is required",
  }),
  description: Joi.string().optional(),
});

export { payloadSchema };
