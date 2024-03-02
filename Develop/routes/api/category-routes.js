const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories with associated products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET a single category by its ID with associated products
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new category
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT (update) a category by its ID
router.put('/:id', async (req, res) => {
  try {
    const [updatedRowsCount, updatedCategories] = await Category.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    if (updatedRowsCount === 0) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    res.json(updatedCategories[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE a category by its ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedRowCount = await Category.destroy({
      where: { id: req.params.id },
    });

    if (deletedRowCount === 0) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;