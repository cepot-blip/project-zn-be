import Joi from "joi";

const payloadPostSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "title is required",
  }),
  content: Joi.string().required().messages({
    "any.required": "content is required",
  }),
  image_link: Joi.string().allow("", null).optional(),
  like_count: Joi.number().optional(),
  category_id: Joi.number().required().messages({
    "any.required": "category_id is required",
  }),
});

const payloadPutSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "title is required",
  }),
  content: Joi.string().required().messages({
    "any.required": "content is required",
  }),
  image_link: Joi.string().allow("", null).optional(),
  category_id: Joi.number().required().messages({
    "any.required": "category_id is required",
  }),
});
export { payloadPostSchema, payloadPutSchema };
