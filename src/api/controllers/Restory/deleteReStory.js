import { request, response } from "express";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import reStoryService from "../../../lib/services/ReStory";
import tokenize from "../../../utils/tokenize";
import AuthorizationError from "../../../utils/exceptions/AuthorizationError";

export const deleteReStory = async (req = request, res = response) => {
  const id = parseInt(req.params.id);

  const jwtToken = req.headers.authorization;
  const { id: user_id } = await tokenize.decodeJWT(jwtToken);

  const checkReStoryId = await reStoryService.getReStoryById(id);
  if (!checkReStoryId) {
    throw new NotFoundError("ReStory not found, put valid ID");
  }

  if (user_id !== checkReStoryId.user_id) {
    throw new AuthorizationError(
      "You are not authorized to delete this reStory"
    );
  }

  await reStoryService.deleteReStory(id);

  return res.status(200).json({
    status: true,
    message: "Successfully deleted reStory",
  });
};
