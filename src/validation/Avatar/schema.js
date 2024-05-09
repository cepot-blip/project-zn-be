import Joi from "joi";

const payloadPostSchema = Joi.object({
  image_link: Joi.string().optional(),
});

const payloadPutSchema = Joi.object({
  image_link: Joi.string().required().messages({
    "any.required": "image_link is required",
  }),
});

export { payloadPostSchema, payloadPutSchema };
