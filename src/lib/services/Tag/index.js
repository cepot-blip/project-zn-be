import { tagModels } from "../../../models/Models";

class TagService {
  #tagModels;

  constructor(tagModels) {
    this.#tagModels = tagModels;
  }

  async getTag() {
    return await this.#tagModels.findMany();
  }

  async getTagById(id) {
    return await this.#tagModels.findUnique({ where: { id } });
  }

  async createTag(tag_name) {
    await this.#tagModels.create({ data: { tag_name } });
  }

  async updateTag(id, tag_name) {
    await this.#tagModels.update({ where: { id }, data: { tag_name } });
  }

  async deleteTag(id) {
    await this.#tagModels.delete({ where: { id } });
  }
}

const tagService = new TagService(tagModels);

export default tagService;
