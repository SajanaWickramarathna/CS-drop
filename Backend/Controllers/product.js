const Product = require('../Models/product');
const Brand = require('../Models/brand');

exports.addProduct = async (req, res) => {
  try {
    const { product_name, product_description, product_price, product_status, product_image, category_id, brand_id } = req.body;
    if (!category_id || !brand_id)
      return res.status(400).json({ error: 'category_id and brand_id are required' });

    const brand = await Brand.findOne({ brand_id: Number(brand_id), category_id: Number(category_id) });
    if (!brand) return res.status(400).json({ error: 'Brand does not belong to the given category' });

    const product = new Product({
      product_name,
      product_description,
      product_price,
      product_status,
      product_image,
      category_id: Number(category_id),
      brand_id: Number(brand_id)
    });
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ product_id: Number(id) });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    if (update.category_id || update.brand_id) {
      const catId = update.category_id ? Number(update.category_id) : undefined;
      const brId = update.brand_id ? Number(update.brand_id) : undefined;
      const product = await Product.findOne({ product_id: Number(id) });
      const finalCatId = catId || product.category_id;
      const finalBrId = brId || product.brand_id;

      // Validate brand-category association
      const brand = await Brand.findOne({ brand_id: finalBrId, category_id: finalCatId });
      if (!brand) return res.status(400).json({ error: 'Brand does not belong to the given category' });
    }

    const product = await Product.findOneAndUpdate({ product_id: Number(id) }, update, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findOneAndDelete({ product_id: Number(id) });
    if (!result) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};