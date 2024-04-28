import { avatarModel } from "../../../models/Models";

class AvatarService {
  #avatarModel;

  constructor(avatarModel) {
    this.#avatarModel = avatarModel;
  }

  async getAvatars() {
    return await this.#avatarModel.findMany();
  }

  async getAvatarById(id) {
    return await this.#avatarModel.findUnique({ where: { id } });
  }

  async getAvatarByUserId(user_id) {
    return await this.#avatarModel.findUnique({ where: { user_id } });
  }

  async createAvatar(data) {
    await this.#avatarModel.create({ data });
  }

  async updateAvatarById(id, data) {
    await this.#avatarModel.update({ where: { id }, data });
  }

  async deleteAvatarById(id) {
    await this.#avatarModel.delete({ where: { id } });
  }
}

const avatarService = new AvatarService(avatarModel);

export default avatarService;
