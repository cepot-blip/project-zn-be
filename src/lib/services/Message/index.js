import { MessageModel } from "../../../models/Models";

class MessageService {
  #messageModel;

  constructor(messageModel) {
    this.#messageModel = messageModel;
  }

  async verifyOwnerMessage({ id, sender_user_id, receiver_user_id }) {
    return await this.#messageModel.findUnique({
      where: {
        id,
        sender_user_id,
        receiver_user_id,
      },
    });
  }

  async createMessage(data) {
    await this.#messageModel.create({ data });
  }

  async getMessageById(id) {
    return await this.#messageModel.findUnique({ where: { id } });
  }

  async getMessageByUserId({ user_id, skip, take }) {
    return await this.#messageModel.findMany({
      where: {
        sender_user_id: user_id,
      },
      skip,
      take,
      orderBy: { updated_at: "desc" },
    });
  }

  async getTotalMessageByUserId(user_id) {
    return await this.#messageModel.count({
      where: {
        sender_user_id: user_id,
      },
    });
  }

  async deleteMessageById(id) {
    await this.#messageModel.delete({ where: { id } });
  }

  async updateMessageById(id, data) {
    await this.#messageModel.update({ where: { id }, data });
  }
}

const messageService = new MessageService(MessageModel);
export default messageService;
