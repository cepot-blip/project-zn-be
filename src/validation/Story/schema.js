import Joi from "joi";

const payloadSchema = Joi.object({
  content: Joi.string().required().messages({
    "any.required": "content is required",
  }),
  image_link: Joi.string().allow("", null).optional(),
  category_id: Joi.number().required().messages({
    "any.required": "category_id is required",
  }),
});

export { payloadSchema };
