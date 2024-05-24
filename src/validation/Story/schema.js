import Joi from "joi";

const payloadSchema = Joi.object({
  content: Joi.string().optional().messages({
    "any.required": "content is required",
  }),
  image_link: Joi.string().allow("", null).optional(),
  category_id: Joi.number().allow(null).optional(),
});

export { payloadSchema };
