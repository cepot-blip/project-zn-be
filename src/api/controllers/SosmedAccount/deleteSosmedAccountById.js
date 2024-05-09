import { request, response } from "express";
import sosmedAccountService from "../../../lib/services/SosmedAccount";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import AuthorizationError from "../../../utils/exceptions/AuthorizationError";
import tokenize from "../../../utils/tokenize";

const deleteSosmedAccountById = async (req = request, res = response) => {
  const { id } = req.params;

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

  await sosmedAccountService.deleteSosmedAccountById(Number(id));

  return res.status(200).json({
    status: true,
    message: "Successfully delete sosmed account",
  });
};

export default deleteSosmedAccountById;
