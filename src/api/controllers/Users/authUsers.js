import { request, response } from "express"
import jwt from "jsonwebtoken"
import env from "dotenv"
import cryptoJs from "crypto-js"
import { UsersModels } from "../../../models/Models";
env.config()

/**
 * @function authUsers ini digunakan untuk melakukan autentikasi user
 * @async ini digunakan untuk menandakan bahwa fungsi ini bersifat asynchronous 
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * 
 * @author Mprooy
*/


export const authUsers = async (req = request, res = response) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          success: false,
          error: "Token not found!",
        });
      }
  
      const bearer = token.split(" ")[1];
      const decToken = cryptoJs.AES.decrypt(bearer, process.env.API_SECRET).toString(cryptoJs.enc.Utf8);
      const verify = jwt.verify(decToken, process.env.API_SECRET);
  
      if (!verify) {
        return res.status(401).json({
          success: false,
          error: "Error",
        });
      }
  
      if (verify.exp < Date.now() / 1000) {
        return res.status(401).json({
          success: false,
          error: "Token Expired!",
        });
      }
  
      const getUserData = await UsersModels.findUnique({
        where: {
          id: verify.id,
        },
      });
  
      const { password, ...userData } = getUserData;
  
      return res.status(200).json({
        success: true,
        query: userData,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };