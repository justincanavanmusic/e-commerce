const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Shirts',
  },
  {
    category_name: 'Shorts',
  },
  {
    category_name: 'Music',
  },
  {
    category_name: 'Hats',
  },
  {
    category_name: 'Shoes',
  },
];

//the seedCategories function creates 5 instances of the Category model at once, using the categoryData printed above. 
const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
