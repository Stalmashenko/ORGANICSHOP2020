const {Sequelize, DataTypes} = require('sequelize');

module.exports = function(sequelize)
{
  const OrderedProducts = sequelize.define('OrderedProducts',
    {
      id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
      count: {type: Sequelize.INTEGER, allowNull: false, validate: {min: 1}}
    },
    {
      sequelize,
      modelName: 'OrderedProducts',
      tableName: 'OrderedProducts',
      timestamps: false
    });
    return OrderedProducts;
}
