import { communityMembershipModel } from "../../../models/Models";

class communityMembershipService {
  #communityMembershipModel;

  constructor(communityMembershipModel) {
    this.#communityMembershipModel = communityMembershipModel;
  }

  async createCommunityMembership(data) {
    await this.#communityMembershipModel.create({ data });
  }

  async getCommunityMembership(community_id) {
    return await this.#communityMembershipModel.findMany({
      where: { community_id },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            profilePicture: true,
          },
        },
      },
      orderBy: { id: "desc" },
    });
  }

  async checkUserMembership(community_id, user_id) {
    return await this.#communityMembershipModel.findUnique({
      where: { community_id_user_id: { community_id, user_id } },
    });
  }

  async deleteCommunityMembership(community_id, user_id) {
    await this.#communityMembershipModel.delete({
      where: { community_id_user_id: { community_id, user_id } },
    });
  }

  async totalDataCommunityMembership() {
    return await this.#communityMembershipModel.count();
  }
}
const CommunityMembershipService = new communityMembershipService(
  communityMembershipModel
);
export default CommunityMembershipService;
