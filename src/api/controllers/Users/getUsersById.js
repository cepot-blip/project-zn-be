import { request, response } from "express";
import userService from "../../../lib/services/User";

export const getUsersById = async (req = request, res = response) => {
  const { id } = await req.params;
  const result = await userService.getUserById(parseInt(id));

  res.status(200).json({
    success: true,
    query: result,
  });
};
