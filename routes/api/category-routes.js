const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll(
    {
    include: {
      model: Product
    } 
  }
  ).then((allCategoryData) => {
    res.json(allCategoryData);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne(
    {
      // Gets the book based on the isbn given in the request parameters
      where: { 
        id: req.params.id 
      },
      include: {
        model: Product
      }
    }
  ).then((categoryDataId) => {
    res.json(categoryDataId);
  });
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
