import cryptoJs from "crypto-js";
import jwt from "jsonwebtoken";

class JWT {
  #jwt;
  constructor(jwt) {
    this.#jwt = jwt;
  }

  async #decriptToken(token) {
    return await cryptoJs.AES.decrypt(
      token.split(" ")[1],
      process.env.API_SECRET
    ).toString(cryptoJs.enc.Utf8);
  }

  async decodeJWT(token) {
    const decriptToken = await this.#decriptToken(token);
    return this.#jwt.verify(decriptToken, process.env.API_SECRET);
  }
}

const tokenize = new JWT(jwt);

export default tokenize;
