import Joi from "joi";

const payloadSchema = Joi.object({
  notificationContent: Joi.string().required().messages({
    "any.required": "notificationContent is required",
  }),
  user_id: Joi.number().required().messages({
    "any.required": "user_id is required",
  }),
});

export { payloadSchema };
