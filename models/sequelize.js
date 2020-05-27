const Sequelize = require('sequelize');

const ProductsModel = require('./Products.js');
const UsersModel = require('./Users.js');
const OrdersModel = require('./Orders.js');
const OrderedProductsModel = require('./OrderedProducts.js')

const sequelize=new Sequelize('ORGANICSHOP','SAP','123',{host:'127.0.0.1',dialect:'mssql'});

sequelize.sync({force: false}).then(() =>
{
  console.log('database create');
});

function models(sequelize)
{
  var model =
  {
    Products: ProductsModel(sequelize),
    Users: UsersModel(sequelize),
    Orders: OrdersModel(sequelize),
    OrderedProducts: OrderedProductsModel(sequelize)
  };

  model.Users.hasMany(model.Orders);
  model.Orders.belongsTo(model.Users);

  model.Products.belongsToMany(model.Orders, {through: model.OrderedProducts});
  model.Orders.belongsToMany(model.Products, {through: model.OrderedProducts});
  model.OrderedProducts.belongsTo(model.Products);
  model.OrderedProducts.belongsTo(model.Orders);

  return model;
}


try
{
  sequelize.authenticate()
    .then(() =>
  {
    console.log('Connection successfull');
  })
} catch (e)
{
  console.error(e);
}

module.exports =
{
  Products,
  Users,
  Orders,
  OrderedProducts
} = models(sequelize);
