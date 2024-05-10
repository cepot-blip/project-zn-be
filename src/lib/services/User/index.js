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
            title: true,
            content: true,
            postedAt: true,
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
            title: true,
            content: true,
            postedAt: true,
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

  async getUserbyEmail(email) {
    return await this.#userModel.findUnique({ where: { email: email } });
  }

  async createUser(username, email, password, fullName, profilePicture) {
    return await this.#userModel.create({
      data: {
        username,
        email,
        password,
        fullName,
        profilePicture,
      },
    });
  }

  async updateUserById(id, username, email, fullName, profilePicture) {
    await this.#userModel.update({
      where: { id },
      data: { username, email, fullName, profilePicture },
    });
  }

  async changePassword(email, password) {
    await this.#userModel.update({ where: { email }, data: { password } });
  }

  async deleteUserById(id) {
    await this.#userModel.delete({ where: { id } });
  }

  async countTotalDataUser() {
    return await this.#userModel.count();
  }
}

const userService = new UserService(UsersModels);

export default userService;
