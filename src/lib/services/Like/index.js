import { likeModels } from "../../../models/Models";

class LikeService {
  #likeModels;

  constructor(likeModels) {
    this.#likeModels = likeModels;
  }

  async getLike(user_id, story_id) {
    return await this.#likeModels.findMany({ where: { user_id, story_id } });
  }

  async getLikeById(id) {
    return await this.#likeModels.findUnique({ where: { id } });
  }

  async addLike(user_id, story_id) {
    await this.#likeModels.create({ data: { user_id, story_id } });
  }

  async deleteLike(id) {
    await this.#likeModels.delete({ where: { id } });
  }

  async checkAvailabilityLike(user_id, story_id) {
    return await this.#likeModels.findUnique({
      where: { user_id_story_id: { user_id, story_id } },
    });
  }
}

const likeService = new LikeService(likeModels);

export default likeService;
