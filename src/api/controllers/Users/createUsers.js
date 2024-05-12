import { request, response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import env from "dotenv";
import UserValidation from "../../../validation/User";
import userService from "../../../lib/services/User";
import InvariantError from "../../../utils/exceptions/InvariantError";

env.config();

const salt = bcrypt.genSaltSync(10);

/**
 * @function createUsers ini digunakan untuk membuat user baru
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function checkUniqueEmail ini digunakan untuk mengecek apakah email yang diinput sudah ada atau belum
 * @returns mengembalikan data yang baru saja dibuat
 *
 * @author Mprooy
 */

export const createUsers = async (req = request, res = response) => {
  const {
    username,
    email,
    phone_number,
    password,
    fullName,
    profilePicture = null,
  } = await req.body;

  UserValidation.validatePayloadUser({
    username,
    email,
    phone_number,
    password,
    fullName,
    profilePicture,
  });

  // VALIDASI EMAIL
  let where = { email: email };
  const checkUniqueEmail = await userService.getUserbyCredentials(where);

  if (checkUniqueEmail) {
    throw new InvariantError("Email already existed");
  }

  where = { phone_number: phone_number };
  const checkUniquePhoneNumber = await userService.getUserbyCredentials(where);

  if (checkUniquePhoneNumber) {
    throw new InvariantError("Phone Number already existed");
  }

  const createUsers = await userService.createUser(
    username,
    email,
    phone_number,
    bcrypt.hashSync(password, salt),
    fullName,
    profilePicture
  );

  const token = jwt.sign(
    {
      app_name: process.env.APP_NAME,
      id: createUsers.id,
      email: createUsers.email,
      phone_number: createUsers.phone_number,
      username: username,
    },
    process.env.API_SECRET
  );

  res.status(201).json({
    success: true,
    msg: "Successfully created users!",
    token: token,
  });
};
