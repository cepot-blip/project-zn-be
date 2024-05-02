const { ReactionModel } = require("../../../models/Models");

class ReactionService {
  #reactionModel;

  constructor(reactionModel) {
    this.#reactionModel = reactionModel;
  }

  async getReactions() {
    return await this.#reactionModel.findMany();
  }

  async getReactionById(id) {
    return await this.#reactionModel.findUnique({ where: { id } });
  }

  async checkAvailableReaction({ story_id, user_id }) {
    return await this.#reactionModel.findUnique({
      where: { user_id_story_id: { user_id, story_id } },
    });
  }

  async createReaction({ story_id, user_id, reaction_type }) {
    await this.#reactionModel.create({
      data: { story_id, user_id, reaction_type },
    });
  }

  async updateReactionById(id, reaction_type) {
    await this.#reactionModel.update({
      where: { id },
      data: {
        reaction_type,
      },
    });
  }

  async deleteReaction({ user_id, story_id }) {
    await this.#reactionModel.delete({
      where: {
        user_id_story_id: {
          user_id,
          story_id,
        },
      },
    });
  }
}

const reactionService = new ReactionService(ReactionModel);
export default reactionService;
