import Joi from "joi";

const payloadSchema = Joi.object({
  platform_id: Joi.string().required().messages({
    "any.required": "platform_id is required",
  }),
});

export { payloadSchema };
