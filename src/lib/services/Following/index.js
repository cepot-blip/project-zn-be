import { followingModels } from "../../../models/Models";

class FollowingService {
  #followingModels;

  constructor(followingModels) {
    this.#followingModels = followingModels;
  }

  async getFollowing(follower_user_id) {
    return await this.#followingModels.findMany({
      where: { follower_user_id: follower_user_id },
    });
  }

  async getFollower(following_user_id) {
    return await this.#followingModels.findMany({
      where: { following_user_id: following_user_id },
    });
  }

  async getFollowingById(id, following_user_id) {
    return await this.#followingModels.findUnique({
      where: { id: id, following_user_id: following_user_id },
    });
  }

  async createFollowing(following_user_id, follower_user_id) {
    await this.#followingModels.create({
      data: { following_user_id, follower_user_id },
    });
  }

  async deleteFollowing(id) {
    await this.#followingModels.delete({ where: { id } });
  }

  async checkFollowing(following_user_id, follower_user_id) {
    return await this.#followingModels.findUnique({
      where: {
        follower_user_id_following_user_id: {
          follower_user_id,
          following_user_id,
        },
      },
    });
  }
}

const followingService = new FollowingService(followingModels);

export default followingService;
