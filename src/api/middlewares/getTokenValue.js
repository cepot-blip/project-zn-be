import { response, request } from "express";
import cryptoJs from "crypto-js";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

export const JWTValue = async (req = request, res = response, next) => {
  try {
    const token = await req.headers["authorization"];

    const decriptToken = await cryptoJs.AES.decrypt(
      token.split(" ")[1],
      process.env.API_SECRET
    ).toString(cryptoJs.enc.Utf8);

    const verivy = await jwt.verify(decriptToken, process.env.API_SECRET);

    return verivy;
  } catch (error) {
    res.status(401).json({
      success: false,
      msg: "Login terlebih dahulu untuk medapatkan token!",
    });
  }
};
