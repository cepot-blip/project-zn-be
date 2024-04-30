import { request, response } from "express";
import InvariantError from "../../../utils/exceptions/InvariantError";
import tokenize from "../../../utils/tokenize";
import platformService from "../../../lib/services/Platform";
import sosmedAccountService from "../../../lib/services/SosmedAccount";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

const createSosmedAccount = async (req = request, res = response) => {
  const { platform_id } = req.body;
  if (!platform_id) {
    throw new InvariantError("Platform id is required");
  }

  const platform = await platformService.getPlatformById(Number(platform_id));

  if (!platform) {
    throw NotFoundError("Platform not found, put valid id");
  }

  const token = await req.headers["authorization"];
  const { id: user_id } = await tokenize.decodeJWT(token);
  const sosmedAccount = await sosmedAccountService.getSosmedAccountByUserId(
    user_id
  );

  if (sosmedAccount) {
    throw new InvariantError("You already have an sosmed account");
  }

  const data = {
    user_id,
    platform_id: Number(platform_id),
  };

  await sosmedAccountService.createSosmedAccount(data);

  return res
    .status(201)
    .json({ status: true, message: "Successfully create sosmed account" });
};

export default createSosmedAccount;
