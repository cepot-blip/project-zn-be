import { platformModel } from "../../../models/Models";

class PlatformService {
  #platformModel;

  constructor(platformModel) {
    this.#platformModel = platformModel;
  }

  async getPlatforms() {
    return await this.#platformModel.findMany();
  }

  async getPlatformById(id) {
    return await this.#platformModel.findUnique({ where: { id } });
  }
}

const platformService = new PlatformService(platformModel);

export default platformService;
