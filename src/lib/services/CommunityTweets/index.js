import { communityTweetsModel } from "../../../models/Models";

class communityTweetsService {
  #communityTweetsModel;

  constructor(communityTweetsModel) {
    this.#communityTweetsModel = communityTweetsModel;
  }

  async createCommunityTweets(community_id, story_id) {
    await this.#communityTweetsModel.create({
      data: { community_id, story_id },
    });
  }

  async getCommunityTweets(community_id) {
    return await this.#communityTweetsModel.findMany({
      where: { community_id },
      include: {
        story: {
          select: {
            id: true,
            users: {
              select: {
                id: true,
                fullName: true,
                profilePicture: true,
              },
            },
            content: true,
            image_link: true,
            like_count: true,
            category: {
              select: {
                id: true,
                category_name: true,
              },
            },
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });
  }

  async getCommunityTweetsById(id) {
    return await this.#communityTweetsModel.findUnique({
      where: { id },
      include: {
        story: {
          select: {
            id: true,
            users: {
              select: {
                id: true,
                fullName: true,
                profilePicture: true,
              },
            },
            content: true,
            image_link: true,
            like_count: true,
            category: {
              select: {
                id: true,
                category_name: true,
              },
            },
          },
        },
      },
    });
  }

  async deleteCommunityTweets(id) {
    await this.#communityTweetsModel.delete({ where: { id } });
  }

  async totalDataCommunityTweets() {
    return await this.#communityTweetsModel.count();
  }
}
const CommunityTweetsService = new communityTweetsService(communityTweetsModel);
export default CommunityTweetsService;
