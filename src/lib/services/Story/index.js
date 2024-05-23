import { StoryModels } from "../../../models/Models";

class StoryService {
  #StoryModels;

  constructor(StoryModels) {
    this.#StoryModels = StoryModels;
  }

  async getStory(skip, limit) {
    return await this.#StoryModels.findMany({
      orderBy: { id: "desc" },
      skip: parseInt(skip),
      take: parseInt(limit),
      include: {
        category: {
          select: {
            category_name: true,
          },
        },
        users: {
          select: {
            id: true,
            fullName: true,
            profilePicture: true,
          },
        },
        _count: {
          select: {
            comment: true,
            bookmark: true,
          },
        },
      },
    });
  }

  async getStoryById(id) {
    return await this.#StoryModels.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            category_name: true,
          },
        },
        users: {
          select: {
            id: true,
            fullName: true,
            profilePicture: true,
          },
        },
        _count: {
          select: {
            comment: true,
            bookmark: true,
          },
        },
      },
    });
  }

  async createStory(data) {
    await this.#StoryModels.create({ data });
  }

  async updateStory(id, data) {
    await this.#StoryModels.update({ where: { id }, data });
  }

  async deleteStory(id) {
    await this.#StoryModels.delete({ where: { id } });
  }

  async checkAvailabilityStoryByUserId(id, user_id) {
    return await this.#StoryModels.findUnique({ where: { id, user_id } });
  }

  async totalStoryData() {
    return await this.#StoryModels.count();
  }
}

const storyService = new StoryService(StoryModels);

export default storyService;
