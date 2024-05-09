import Joi from "joi";

const payloadSchema = Joi.object({
  tag_id: Joi.number().required().messages({
    "any.required": "tag_id is required",
  }),
});

export { payloadSchema };
