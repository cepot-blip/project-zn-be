import Joi from "joi";

const payloadSchema = Joi.object({
  content: Joi.string().required().messages({
    "any.required": "content is required",
  }),
});

export { payloadSchema };
