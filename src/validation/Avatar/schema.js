import Joi from "joi";

const payloadSchema = Joi.object({
  image_link: Joi.string().required().messages({
    "any.required": "image_link is required",
  }),
});

export { payloadSchema };
