import { request, response } from "express";
import userService from "../../../lib/services/User";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import UserValidation from "../../../validation/User";

/**
 * @function updateUsers ini digunakan untuk update data user
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function checkUniqueId ini digunakan untuk mengecek apakah id yang diinput sudah ada atau belum
 * @function checkUniqueEmail ini digunakan untuk mengecek apakah email yang diinput sudah ada atau belum
 * @returns mengembalikan data yang baru saja diupdate
 * @function result ini digunakan untuk menampung data yang telah diupdate
 *
 * @author Mprooy
 */

export const updateUsers = async (req = request, res = response) => {
  const { id, username, email, phone_number, fullName, profilePicture } =
    await req.body;

  UserValidation.validateUpdateUser({
    id,
    username,
    email,
    phone_number,
    fullName,
    profilePicture,
  });

  const checkUniqueId = await userService.getUserById(parseInt(id));

  if (!checkUniqueId) {
    throw new NotFoundError("Id not found!");
  }

  await userService.updateUserById(
    id,
    username,
    email,
    phone_number,
    fullName,
    profilePicture
  );

  res.status(200).json({
    success: true,
    msg: "Successfully update users!",
  });
};
