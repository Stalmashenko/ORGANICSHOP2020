const {OrderedProducts, Products, Users, Orders} = require('../models/sequelize.js');
const sequelize = require('sequelize');
const {QueryTypes } = require('sequelize')
exports.getOrders = function (request, response) {
    if (request.isAuthenticated()) {
        Orders.findAll({
            include: [{
            model: Products,
            },{
                model: OrderedProducts
            }],
            where: {
            userId: request.user
            }}).then(orders => {
                    console.log(orders.map(order => order.toJSON()));
                 response.render("history", {login:true, Orders: orders.map(order => order.toJSON())});
            })
    }
    else{
        response.redirect('/entry');      
    }
}