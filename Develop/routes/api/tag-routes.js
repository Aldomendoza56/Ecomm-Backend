const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET a single tag by its ID
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });

    if (!tag) {
      res.status(404).json({ error: 'Tag not found' });
      return;
    }

    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new tag
router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT (update) a tag's name by its ID
router.put('/:id', async (req, res) => {
  try {
    const [updatedRowsCount, updatedTags] = await Tag.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    if (updatedRowsCount === 0) {
      res.status(404).json({ error: 'Tag not found' });
      return;
    }

    res.json(updatedTags[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE a tag by its ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedRowCount = await Tag.destroy({
      where: { id: req.params.id },
    });

    if (deletedRowCount === 0) {
      res.status(404).json({ error: 'Tag not found' });
      return;
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
