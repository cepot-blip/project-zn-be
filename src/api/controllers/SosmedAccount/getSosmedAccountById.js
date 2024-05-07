import { request, response } from "express";
import sosmedAccountService from "../../../lib/services/SosmedAccount";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

const getSosmedAccountById = async (req = request, res = response) => {
  const { id } = req.params;

  const sosmedAccount = await sosmedAccountService.getSosmedAccountById(
    Number(id)
  );

  if (!sosmedAccount) {
    throw new NotFoundError("Sosmed account not found, put valid id");
  }

  return res.status(200).json({
    status: true,
    message: "Get sosmed account successfully",
    data: sosmedAccount,
  });
};

export default getSosmedAccountById;
