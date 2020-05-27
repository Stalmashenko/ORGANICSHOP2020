const {Products} = require('../models/sequelize.js');
exports.index = function (request, response) {
    Products.findAll()
    .then(products => {
        if (request.isAuthenticated()) {
                 response.render("catalog", {login:true, Products: products.map(product => product.toJSON())});
          }
         else{
              response.render("catalog", {login:false, Products: products.map(product => product.toJSON())});      
         }
    });
}