import { request, response } from "express";
import jwt from "jsonwebtoken";
import env from "dotenv";
import cryptoJs from "crypto-js";
import AuthenticationError from "../../../utils/exceptions/AuthenticationError";
import userService from "../../../lib/services/User";
env.config();

/**
 * @function authUsers ini digunakan untuk melakukan autentikasi user
 * @async ini digunakan untuk menandakan bahwa fungsi ini bersifat asynchronous
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 *
 * @author Mprooy
 */

export const authUsers = async (req = request, res = response) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new AuthenticationError("Token not found!");
  }

  const bearer = token.split(" ")[1];
  const decToken = cryptoJs.AES.decrypt(
    bearer,
    process.env.API_SECRET
  ).toString(cryptoJs.enc.Utf8);
  const verify = jwt.verify(decToken, process.env.API_SECRET);

  if (!verify) {
    throw new AuthenticationError(
      "Error! Failed to verify. Please login again."
    );
  }

  if (verify.exp < Date.now() / 1000) {
    throw new AuthenticationError("Token expired!");
  }

  const getUserData = await userService.getUserById(verify.id);

  const { password, ...userData } = getUserData;

  return res.status(200).json({
    success: true,
    query: userData,
  });
};
