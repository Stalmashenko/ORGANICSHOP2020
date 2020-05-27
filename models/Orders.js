const {Sequelize, DataTypes} = require('sequelize');

module.exports = function(sequelize)
{
  const Orders = sequelize.define('Orders',
    {
      id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
      orderStatus: {type: Sequelize.STRING, allowNull:false},
      date: {type: Sequelize.STRING, allowNull:false}},
    {
      sequelize,
      modelName: 'Orders',
      tableName: 'Orders',
      timestamps: false
    });
    return Orders;
}
