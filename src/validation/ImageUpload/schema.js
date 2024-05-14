import Joi from "joi";

const imageTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

const payloadSchema = Joi.object({
  image: Joi.valid(...imageTypes)
    .required()
    .messages({
      "any.required": "image is required",
    }),
});

export { payloadSchema };
