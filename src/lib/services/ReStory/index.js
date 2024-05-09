import { ReStoryModels } from "../../../models/Models";

class ReStoryService {
  #ReStoryModels;

  constructor(ReStoryModels) {
    this.#ReStoryModels = ReStoryModels;
  }

  async getReStory() {
    return await this.#ReStoryModels.findMany();
  }

  async getReStoryById(id) {
    return await this.#ReStoryModels.findUnique({ where: { id } });
  }

  async createReStory(user_id, story_id) {
    await this.#ReStoryModels.create({ data: { user_id, story_id } });
  }

  async deleteReStory(id) {
    await this.#ReStoryModels.delete({ where: { id } });
  }
}

const reStoryService = new ReStoryService(ReStoryModels);

export default reStoryService;
