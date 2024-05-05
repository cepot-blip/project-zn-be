import Joi from "joi";

const payloadPostSchema = Joi.object({
  receiver_user_id: Joi.number().required(),
  message_content: Joi.string().required(),
});

const payloadPutSchema = Joi.object({
  message_content: Joi.string().required(),
});

export { payloadPostSchema, payloadPutSchema };
