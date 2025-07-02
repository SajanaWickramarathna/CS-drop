const Category = require('../Models/category');

exports.addCategory = async (req, res) => {
  try {
    const { category_name, category_description, category_image, category_status } = req.body;
    const exists = await Category.findOne({ category_name });
    if (exists) return res.status(400).json({ error: 'Category name already exists.' });

    const category = new Category({
      category_name,
      category_description,
      category_image,
      category_status
    });
    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({ category_id: Number(id) });
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    if (update.category_name) {
      // Check for name uniqueness
      const exists = await Category.findOne({ category_name: update.category_name, category_id: { $ne: Number(id) } });
      if (exists) return res.status(400).json({ error: 'Category name already exists.' });
    }
    const category = await Category.findOneAndUpdate({ category_id: Number(id) }, update, { new: true });
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Category.findOneAndDelete({ category_id: Number(id) });
    if (!result) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};