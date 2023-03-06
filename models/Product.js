// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
   id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
      isDecimal: true
    }
  },
    stock: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true
      }
  },
//using the category_id (which is referencing the id from the Category table) allows us to have a connection from the two tables (Category and Products). this number is going to tell us the CATEGORY that each PRODUCT belongs to. for example in "id: 1", the product_name is "Plain T-Shirt". within the products table... the category_id and category.id are matching and both equal to 1. and connected to that category id is the category_name of "Shirts" which is the proper category for the Product "Plain T-Shirt"
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
      },
  
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
