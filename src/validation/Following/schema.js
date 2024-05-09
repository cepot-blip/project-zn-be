import Joi from "joi";

const payloadSchema = Joi.object({
  following_user_id: Joi.number().required().messages({
    "any.required": "following_user_id is required",
  }),
  follower_user_id: Joi.number().required().messages({
    "any.required": "follower_user_id is required",
  }),
});

export { payloadSchema };
