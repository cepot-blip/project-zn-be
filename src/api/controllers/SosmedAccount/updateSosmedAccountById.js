import { request, response } from "express";
import sosmedAccountService from "../../../lib/services/SosmedAccount";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import platformService from "../../../lib/services/Platform";

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
