import { request, response } from "express";
import tokenize from "../../../utils/tokenize";
import storyService from "../../../lib/services/Story";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import bookmarkService from "../../../lib/services/Bookmark";

const addOrDeleteBookmark = async (req = request, res = response) => {
  const token = req.headers["authorization"];
  const { id: user_id } = await tokenize.decodeJWT(token);
  const { id: story_id } = req.params;

  const checkAvailableStory = await storyService.getStoryById(Number(story_id));
  if (!checkAvailableStory) {
    throw new NotFoundError("Story not found, put valid id");
  }

  const verifyAvailableBookmark = await bookmarkService.verifyAvailableBookmark(
    user_id,
    Number(story_id)
  );

  if (verifyAvailableBookmark) {
    await bookmarkService.deleteBookmark(user_id, Number(story_id));
    return res.status(200).json({
      status: true,
      message: "Bookmark deleted successfully",
    });
  }

  const payload = {
    user_id,
    story_id: Number(story_id),
  };
  await bookmarkService.createBookmark(payload);
  return res.status(201).json({
    status: true,
    message: "Bookmark created successfully",
  });
};

export default addOrDeleteBookmark;
