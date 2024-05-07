import { CategoryModels } from "../../../models/Models";

class CategoryService {
  #CategoryModels;

  constructor(categoryModels) {
    this.#CategoryModels = categoryModels; // Changed to categoryModels
  }

  async getCategories() {
    return await this.#CategoryModels.findMany();
  }

  async getCategoryById(id) {
    return await this.#CategoryModels.findUnique({ where: { id } });
  }

  async createCategory(data) {
    await this.#CategoryModels.create({ data });
  }

  async updateCategory(id, data) {
    await this.#CategoryModels.update({ where: { id }, data });
  }

  async deleteCategory(id) {
    await this.#CategoryModels.delete({ where: { id } });
  }
}

const categoryService = new CategoryService(CategoryModels); // Corrected the parameter name

export default categoryService;
