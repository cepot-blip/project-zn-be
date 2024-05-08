import { MessageModel } from "../../../models/Models";

class MessageService {
  #messageModel;

  constructor(messageModel) {
    this.#messageModel = messageModel;
  }

  async verifyOwnerMessageSend({ id, sender_user_id }) {
    return await this.#messageModel.findUnique({
      where: {
        id,
        sender_user_id,
      },
    });
  }

  async verifyOwnerMessageReceive({ id, receiver_user_id }) {
    return await this.#messageModel.findUnique({
      where: {
        id,
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

  async getMessageSendByUserId({ user_id, skip, take }) {
    return await this.#messageModel.findMany({
      where: {
        sender_user_id: user_id,
      },
      skip,
      take,
      orderBy: { updated_at: "desc" },
    });
  }

  async getMessageReceiveByUserId({ user_id, skip, take }) {
    return await this.#messageModel.findMany({
      where: {
        receiver_user_id: user_id,
      },
      skip,
      take,
      orderBy: { updated_at: "desc" },
    });
  }

  async getTotalMessageSendByUserId(user_id) {
    return await this.#messageModel.count({
      where: {
        sender_user_id: user_id,
      },
    });
  }

  async getTotalMessageReceiveByUserId(user_id) {
    return await this.#messageModel.count({
      where: {
        receiver_user_id: user_id,
      },
    });
  }

  async deleteMessageById(id) {
    await this.#messageModel.delete({ where: { id } });
  }

  async updateMessageById(id, data) {
    await this.#messageModel.update({ where: { id }, data });
  }

  async updateStatusMessageById(id, status) {
    await this.#messageModel.update({ where: { id }, data: { status } });
  }
}

const messageService = new MessageService(MessageModel);
export default messageService;
