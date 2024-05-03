import { request, response } from "express";
import bcrypt from "bcryptjs";
import userService from "../../../lib/services/User";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import ClientError from "../../../utils/exceptions/ClientError";
import UserValidation from "../../../validation/User";

const salt = bcrypt.genSaltSync(10);

export const changePasswordUsers = async (req = request, res = response) => {
  const { email, oldPassword, newPassword } = req.body;
  UserValidation.validateChangePassword({ email, oldPassword, newPassword });

  const findUsers = await userService.getUserbyEmail(email);

  if (!findUsers) {
    throw new NotFoundError("Email Not Found!");
  }

  const compareOldPassword = await bcrypt.compareSync(
    oldPassword,
    findUsers.password
  );
  if (!compareOldPassword) {
    throw new ClientError("Incorrect old password");
  }

  const hashNewPassword = await bcrypt.hashSync(newPassword, salt);
  await userService.changePassword(email, hashNewPassword);

  res.status(200).json({
    success: true,
    msg: "Successfully changed password!",
  });
};
