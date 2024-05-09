import { NotificationModel } from "../../../models/Models";

class NotificationService {
  #notificationModel;

  constructor(notificationModel) {
    this.#notificationModel = notificationModel;
  }

  async createNotification(data) {
    await this.#notificationModel.create({ data });
  }

  async getNotificationsByUserId({ user_id, skip, take }) {
    return await this.#notificationModel.findMany({
      where: {
        user_id,
      },
      skip,
      take,
      orderBy: { created_at: "desc" },
    });
  }

  async getTotalNotificationsByUserId(user_id) {
    return await this.#notificationModel.count({
      where: {
        user_id,
      },
    });
  }

  async getNotificationById(id) {
    return await this.#notificationModel.findUnique({ where: { id } });
  }

  async updateStatusNotificationById(id) {
    return await this.#notificationModel.update({
      where: { id },
      data: { status: true },
    });
  }

  async deleteNotificationById(id) {
    await this.#notificationModel.delete({ where: { id } });
  }
}

const notificationService = new NotificationService(NotificationModel);

export default notificationService;
