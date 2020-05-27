const {Sequelize, DataTypes} = require('sequelize');

module.exports = function(sequelize)
{
  const Products = sequelize.define('Products',
    {
      id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
      name: {type: Sequelize.STRING, allowNull: true, unique: true},
      description: {type: Sequelize.STRING, allowNull: true},
      cost: {type: Sequelize.INTEGER, allowNull: false, validate:{min:1}},
      photo: {type: Sequelize.STRING, allowNull:true}
    },
    {
      sequelize,
      modelName: 'Products',
      tableName: 'Products',
      timestamps: false
    });
    return Products;
}
