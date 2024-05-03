import InvariantError from "../../utils/exceptions/InvariantError";
import {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
  changePasswordSchema,
} from "./schema";

const UserValidation = {
  validatePayloadUser(payload) {
    const { error } = createUserSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },

  validateLoginUser(payload) {
    const { error } = loginUserSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },

  validateUpdateUser(payload) {
    const { error } = updateUserSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },

  validateChangePassword(payload) {
    const { error } = changePasswordSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },
};

export default UserValidation;
