import { request, response } from "express";
import CommunityValidation from "../../../validation/Community";
import CommunityService from "../../../lib/services/Community";

export const createCommunity = async (req = request, res = response) => {
  const { name, description = null } = req.body;
  CommunityValidation.validatePayloadCommunity({ name, description });

  const data = { name, description };
  await CommunityService.createCommunity(data);
  return res
    .status(201)
    .json({ status: true, message: "Successfully create community" });
};
