import Joi from "joi";

const createUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
    .required(),
  phone_number: Joi.string()
    .pattern(/^(08|628)\d+$/)
    .min(10)
    .max(14)
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]+$"))
    .min(8)
    .required(),
  fullName: Joi.string().required(),
  profilePicture: Joi.string().allow("", null).optional(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com"] },
  }),
  phone_number: Joi.string()
    .pattern(/^(08|628)\d+$/)
    .min(10)
    .max(14),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]+$"))
    .min(8)
    .required(),
})
  .xor("email", "phone_number")
  .with("email", "password")
  .with("phone_number", "password");

const updateUserSchema = Joi.object({
  id: Joi.number().required(),
  username: Joi.string().optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com"] },
    })
    .optional(),
  phone_number: Joi.string()
    .pattern(/^(08|628)\d+$/)
    .min(10)
    .max(14)
    .optional(),
  fullName: Joi.string().optional(),
  profilePicture: Joi.string().allow("", null).optional(),
});

const changePasswordSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com"] },
  }),
  phone_number: Joi.string()
    .pattern(/^(08|628)\d+$/)
    .min(10)
    .max(14),
  oldPassword: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]+$"))
    .min(8)
    .required(),
  newPassword: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]+$"))
    .min(8)
    .required(),
})
  .xor("email", "phone_number")
  .with("email", ["oldPassword", "newPassword"])
  .with("phone_number", ["oldPassword", "newPassword"]);
export {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
  changePasswordSchema,
};
