import { request, response } from "express";
import bcrypt from "bcryptjs";
import userService from "../../../lib/services/User";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import ClientError from "../../../utils/exceptions/ClientError";
import UserValidation from "../../../validation/User";

const salt = bcrypt.genSaltSync(10);

export const changePasswordUsers = async (req = request, res = response) => {
  const { email, phone_number, oldPassword, newPassword } = req.body;

  const where = {};
  if (email) {
    UserValidation.validateChangePassword({ email, oldPassword, newPassword });
    where.email = email;
  } else {
    UserValidation.validateChangePassword({
      phone_number,
      oldPassword,
      newPassword,
    });
    where.phone_number = phone_number;
  }

  const findUsers = await userService.getUserbyCredentials(where);

  if (!findUsers) {
    throw new NotFoundError(
      `${where.email ? "Email" : "Phone Number"} not found!`
    );
  }

  const compareOldPassword = await bcrypt.compareSync(
    oldPassword,
    findUsers.password
  );
  if (!compareOldPassword) {
    throw new ClientError("Incorrect old password");
  }

  const hashNewPassword = await bcrypt.hashSync(newPassword, salt);
  await userService.changePassword(where, hashNewPassword);

  res.status(200).json({
    success: true,
    msg: "Successfully changed password!",
  });
};
