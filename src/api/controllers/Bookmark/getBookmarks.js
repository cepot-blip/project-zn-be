import { request, response } from "express";
import bookmarkService from "../../../lib/services/Bookmark";
import tokenize from "../../../utils/tokenize";

const getBookmarks = async (req = request, res = response) => {
  const token = req.headers["authorization"];
  const { id: user_id } = await tokenize.decodeJWT(token);

  const bookmarks = await bookmarkService.getBookmarks(user_id);

  return res.status(200).json({
    status: true,
    message: "Get bookmarks successfully",
    data: bookmarks,
  });
};

export default getBookmarks;
