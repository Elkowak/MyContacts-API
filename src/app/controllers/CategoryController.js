const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;
    const categories = await CategoryRepository.findAll(orderBy);

    return response.json(categories);
  }

  async show(request, response) {
    const { id } = request.params;
    const category = await CategoryRepository.findById(id);

    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }

    return response.json(category);
  }

  async store(request, response) {
    const {
      name,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const categoryExists = await CategoryRepository.findByName(name);

    if (categoryExists) {
      return response.status(400).json({ error: 'Category Already in use' });
    }

    const category = await CategoryRepository.create({
      name,
    });
    return response.json(category);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name,
    } = request.body;

    const categoryExists = await CategoryRepository.findById(id);

    if (!categoryExists) {
      return response.status(404).json({ error: 'Category not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const categoryByName = await CategoryRepository.findByName(name);
    if (categoryByName && categoryByName.id !== id) {
      return response.status(400).json({ error: 'Category already exists' });
    }

    const category = await CategoryRepository.update(id, {
      name,
    });
    return response.json(category);
  }

  async delete(request, response) {
    const { id } = request.params;
    const categoryExists = await CategoryRepository.findById(id);

    if (!categoryExists) {
      return response.status(404).json({ error: 'Category not found' });
    }

    await CategoryRepository.delete(id);
    return response.status(204).send();
  }
}

module.exports = new CategoryController();
