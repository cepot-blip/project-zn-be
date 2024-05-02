import Joi from "joi";

const payloadSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "title is required",
  }),
  content: Joi.string().required().messages({
    "any.required": "content is required",
  }),
  like_count: Joi.number().optional(),
  category_id: Joi.number().required().messages({
    "any.required": "category_id is required",
  }),
});
export { payloadSchema };
