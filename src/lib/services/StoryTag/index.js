import { storyTagModels } from "../../../models/Models";

class StoryTagService {
  #storyTagModels;

  constructor(storyTagModels) {
    this.#storyTagModels = storyTagModels;
  }

  async getStoryTag() {
    return await this.#storyTagModels.findMany({
      include: {
        tag: {
          select: {
            tag_name: true,
          },
        },
      },
    });
  }

  async getStoryTagById(id) {
    return await this.#storyTagModels.findFirst({
      where: { id: id },
      include: {
        tag: {
          select: {
            tag_name: true,
          },
        },
      },
    });
  }

  async createStoryTag(tag_id) {
    await this.#storyTagModels.create({ data: { tag_id } });
  }

  async updateStoryTag(id, tag_id) {
    await this.#storyTagModels.update({ where: { id }, data: { tag_id } });
  }

  async deleteStoryTag(id) {
    await this.#storyTagModels.delete({ where: { id } });
  }
}

const storyTagService = new StoryTagService(storyTagModels);

export default storyTagService;
