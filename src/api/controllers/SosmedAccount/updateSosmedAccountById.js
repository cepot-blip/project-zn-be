import { request, response } from "express";
import sosmedAccountService from "../../../lib/services/SosmedAccount";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import platformService from "../../../lib/services/Platform";
import SosmedAccountValidation from "../../../validation/SosmedAccount";
import tokenize from "../../../utils/tokenize";
import AuthorizationError from "../../../utils/exceptions/AuthorizationError";

const updateSosmedAccountById = async (req = request, res = response) => {
  const { id } = req.params;
  const { platform_id } = req.body;

  SosmedAccountValidation.validatePayloadSosmedAccount({ platform_id });

  const sosmedAccount = await sosmedAccountService.getSosmedAccountById(
    Number(id)
  );

  if (!sosmedAccount) {
    throw new NotFoundError("Sosmed account not found, put valid id");
  }

  const token = req.headers["authorization"];
  const { id: user_id } = await tokenize.decodeJWT(token);

  const checkOwnerSosmedAccount =
    await sosmedAccountService.checkOwnerSosmedAccount(
      sosmedAccount.id,
      user_id
    );

  if (!checkOwnerSosmedAccount) {
    throw new AuthorizationError("User not authorized to access");
  }

  const platform = await platformService.getPlatformById(Number(platform_id));

  if (!platform) {
    throw new NotFoundError("Platform not found, put valid id");
  }

  const data = {
    platform_id: Number(platform_id),
  };

  await sosmedAccountService.updateSosmedAccountById(Number(id), data);

  return res.status(200).json({
    status: true,
    message: "Successfully update sosmed account",
  });
};

export default updateSosmedAccountById;
