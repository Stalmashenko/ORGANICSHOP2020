const {Sequelize, DataTypes} = require('sequelize');

module.exports = function(sequelize)
{
  const Users = sequelize.define('Users',
    {
      id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
      surname: {type: Sequelize.STRING, allowNull: true},
      name: {type: Sequelize.STRING, allowNull: true},
      phone: {type: Sequelize.STRING, allowNull: true},
      email: {type: Sequelize.STRING, allowNull: false, unique: true},
      password: {type: Sequelize.STRING, allowNull: false},
      role: {type: Sequelize.INTEGER, allowNull:false, validate: {min:0, max: 1}}
    },
    {
      sequelize,
      modelName: 'Users',
      tableName: 'Users',
      timestamps: false
    });
    return Users;
}
