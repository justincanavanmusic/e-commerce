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

// in these two relationships, a Product can contain many Tags and a Tag can contain many Products, resulting in a many-to-many relationship. each class "goes through" the ProductTag class which acts as a middleman to connect the two classes. product_id from the ProductTag class connects to the Product Class id and the same with Tag. This allows us to use the ProductTag to retrieve the Tags associated with a specific Product or all Products associated with a specific Tag
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
