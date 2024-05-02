import Joi from "joi";

const payloadSchema = Joi.object({
  platform_id: Joi.string().required().messages({
    "any.required": "Platform id is required",
  }),
});

export { payloadSchema };
