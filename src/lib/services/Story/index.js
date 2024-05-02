import { StoryModels } from "../../../models/Models";

class StoryService {
  #storyModel;

  constructor(storyModel) {
    this.#storyModel = storyModel;
  }

  async getStoryById(id) {
    return await this.#storyModel.findUnique({ where: { id } });
  }
}

const storyService = new StoryService(StoryModels);

export default storyService;
