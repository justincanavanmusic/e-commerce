const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll(
    {
    include: {
      model: Product
    } 
  }
  ).then((allTagData) => {
    res.json(allTagData);
  });
});

router.get('/:id', (req, res) => {
  Tag.findOne(
    {
      where: { 
        id: req.params.id 
      },
      include: {
        model: Product
      }
    }
  ).then((tagData) => {
    res.json(tagData);
  });
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
