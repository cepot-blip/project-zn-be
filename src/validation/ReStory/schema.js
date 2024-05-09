import Joi from "joi";

const payloadSchema = Joi.object({
  user_id: Joi.number().required().messages({
    "any.required": "user_id is required",
  }),
  story_id: Joi.number().required().messages({
    "any.required": "story_id is required",
  }),
});

export { payloadSchema };
