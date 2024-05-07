import { request, response } from "express";
import sosmedAccountService from "../../../lib/services/SosmedAccount";

const getSosmedAccounts = async (req = request, res = response) => {
  const sosmedAccounts = await sosmedAccountService.getSosmedAccounts();

  return res.status(200).json({
    status: true,
    message: "Get sosmed accounts successfully",
    data: sosmedAccounts,
  });
};

export default getSosmedAccounts;
