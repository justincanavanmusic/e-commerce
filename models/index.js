// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

//here we used the belongsTo method .. each Product object can belong to only one Category object. since Category can contain multiple Products, Product and Category have a "one-to-many" relationship
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

//in the database we used the hasMany method to state that a Category can contain more than one Product. For example at this moment in my database there is one category titled "Shirts" which is unique. Within that Category I have 5 different Product objects, hence the ONE (Category) to MANY (Products)
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag,
 { through: ProductTag,
  foreignKey: 'product_id'
}
 )
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, 
  { through: ProductTag, 
  foreignKey: 'tag_id' }
) 

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
