import { sosmedAccountModel } from "../../../models/Models";

class SosmedAccountService {
  #sosmedAccountModel;
  constructor(sosmedAccountModel) {
    this.#sosmedAccountModel = sosmedAccountModel;
  }

  async getSosmedAccounts() {
    return await this.#sosmedAccountModel.findMany();
  }

  async getSosmedAccountById(id) {
    return await this.#sosmedAccountModel.findUnique({ where: { id } });
  }

  async getSosmedAccountByUserId(user_id) {
    return await this.#sosmedAccountModel.findUnique({ where: { user_id } });
  }

  async createSosmedAccount(data) {
    await this.#sosmedAccountModel.create({ data });
  }

  async updateSosmedAccountById(id, data) {
    await this.#sosmedAccountModel.update({ where: { id }, data });
  }

  async deleteSosmedAccountById(id) {
    await this.#sosmedAccountModel.delete({ where: { id } });
  }

  async checkOwnerSosmedAccount(id, user_id) {
    return await this.#sosmedAccountModel.findUnique({
      where: { id, user_id },
    });
  }
}

const sosmedAccountService = new SosmedAccountService(sosmedAccountModel);

export default sosmedAccountService;
