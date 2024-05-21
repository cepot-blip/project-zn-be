import { UsersModels } from "../../../models/Models";

class UserService {
  #userModel;

  constructor(UsersModels) {
    this.#userModel = UsersModels;
  }

  async getUsers(skip, limit, filter) {
    return await this.#userModel.findMany({
      skip: skip,
      take: limit,
      orderBy: { id: "desc" },
      where: filter,
      include: {
        story: {
          select: {
            id: true,
            content: true,
            image_link: true,
            category_id: true,
          },
        },
        comment: {
          select: {
            id: true,
            story_id: true,
            content: true,
            commentAt: true,
          },
        },
      },
    });
  }

  async getUserById(id) {
    return await this.#userModel.findUnique({
      where: { id: id },
      include: {
        story: {
          select: {
            id: true,
            content: true,
            image_link: true,
            category_id: true,
          },
        },
        comment: {
          select: {
            id: true,
            story_id: true,
            content: true,
            commentAt: true,
          },
        },
      },
    });
  }

  async getUserbyCredentials(where) {
    return await this.#userModel.findUnique({ where });
  }

  async createUser(
    username,
    email,
    phone_number,
    password,
    fullName,
    profilePicture
  ) {
    return await this.#userModel.create({
      data: {
        username,
        email,
        phone_number,
        password,
        fullName,
        profilePicture,
      },
    });
  }

  async updateUserById(
    id,
    username,
    email,
    phone_number,
    fullName,
    profilePicture
  ) {
    await this.#userModel.update({
      where: { id },
      data: { username, email, phone_number, fullName, profilePicture },
    });
  }

  async changePassword(where, password) {
    await this.#userModel.update({ where, data: { password } });
  }

  async deleteUserById(id) {
    await this.#userModel.delete({ where: { id: id } });
  }

  async countTotalDataUser() {
    return await this.#userModel.count();
  }
}

const userService = new UserService(UsersModels);

export default userService;
