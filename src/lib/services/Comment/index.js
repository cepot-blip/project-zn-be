const { CommentModels } = require("../../../models/Models");

class CommentService {
  #CommentModels;

  constructor(CommentModels) {
    this.#CommentModels = CommentModels;
  }

  async getComments(story_id, skip, limit) {
    return await this.#CommentModels.findMany({
      where: { story_id },
      orderBy: { id: "desc" },
      skip: parseInt(skip),
      take: parseInt(limit),
    });
  }

  async getCommentById(id, story_id) {
    return await this.#CommentModels.findUnique({ where: { id, story_id } });
  }

  async createComment(user_id, story_id, content) {
    await this.#CommentModels.create({ data: { user_id, story_id, content } });
  }

  async updateCommentById(id, story_id, content) {
    await this.#CommentModels.update({
      where: { id, story_id },
      data: { content },
    });
  }

  async deleteComment(id, story_id) {
    await this.#CommentModels.delete({ where: { id, story_id } });
  }

  async checkAvailabilityCommentByUserId(id, user_id, story_id) {
    return await this.#CommentModels.findUnique({
      where: { id, user_id, story_id },
    });
  }

  async totalCommentData() {
    return await this.#CommentModels.count();
  }
}

const commentService = new CommentService(CommentModels);
export default commentService;
