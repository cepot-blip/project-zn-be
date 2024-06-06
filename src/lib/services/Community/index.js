import { communityModel } from "../../../models/Models";

class communityService {
  #communityModel;

  constructor(communityModel) {
    this.#communityModel = communityModel;
  }

  async createCommunity(data) {
    await this.#communityModel.create({ data });
  }

  async getCommunity() {
    return await this.#communityModel.findMany();
  }

  async getCommunityById(id) {
    return await this.#communityModel.findUnique({ where: { id } });
  }

  async updateCommunity(id, data) {
    await this.#communityModel.update({
      where: { id },
      data,
    });
  }

  async deleteCommunity(id) {
    await this.#communityModel.delete({ where: { id } });
  }

  async totalDataCommunity() {
    return await this.#communityModel.count();
  }
}
const CommunityService = new communityService(communityModel);
export default CommunityService;
