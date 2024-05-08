import { BookmarkModel } from "../../../models/Models";

class BookmarkService {
  #bookmarkModel;

  constructor(bookmarkModel) {
    this.#bookmarkModel = bookmarkModel;
  }

  async verifyAvailableBookmark(user_id, story_id) {
    return await this.#bookmarkModel.findUnique({
      where: {
        user_id_story_id: {
          user_id,
          story_id,
        },
      },
    });
  }

  async createBookmark(data) {
    await this.#bookmarkModel.create({ data });
  }

  async getBookmarks(user_id) {
    return await this.#bookmarkModel.findMany({
      where: {
        user_id,
      },
      include: {
        story: true,
      },
    });
  }

  async deleteBookmark(user_id, story_id) {
    await this.#bookmarkModel.delete({
      where: {
        user_id_story_id: {
          user_id,
          story_id,
        },
      },
    });
  }
}

const bookmarkService = new BookmarkService(BookmarkModel);
export default bookmarkService;
