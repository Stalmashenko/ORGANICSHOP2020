const {OrderedProducts, Products, Users, Orders} = require('../models/sequelize.js');
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

exports.add = function (request, response) {
    currentProductId = request.query.id;
    var cook;
    if(localStorage.getItem('cart'))
    {       
        cook = JSON.parse(localStorage.getItem('cart'));
        cook.push(currentProductId);      
    }
    else
    {
        cook = [currentProductId];
    }
    localStorage.setItem('cart', JSON.stringify(cook));
    response.sendStatus(201);   
};
exports.cart = function (request, response) {
    var cook;
    if(localStorage.getItem('cart'))
    {       
        cook = JSON.parse(localStorage.getItem('cart'));
        var products = [];
        for(i=0; i<cook.length; i++)
        {
            products.push(+cook[i]);
        }
        Products.findAll(
            {where: {id: cook}}) 
                  .then(products => {
                      var array = JSON.parse(localStorage.getItem('cart'));
                      var sum = 0;
                      products.map(product => sum+=array.filter(item => item == product.id).length * product.cost)
                      if (request.isAuthenticated()) {
                        response.render('cart.hbs', { login:true,
                            Products: products.map(product => Object.assign(product.toJSON(), {
                                count: array.filter(item => item == product.id).length
                            })),
                            summa: sum         
                          })
                      }
                      else{
                        response.render('cart.hbs', { login:false,
                            Products: products.map(product => Object.assign(product.toJSON(), {
                                count: array.filter(item => item == product.id).length
                            })),
                            summa: sum         
                          })
                      }
                    })
    }
    else
    {
        response.render('cart.hbs', { login:true,      
          })
    }
}
exports.decrease = function (request, response) {
    var cook;
    currentProductId = request.query.id;
    cook = JSON.parse(localStorage.getItem('cart'));
    cook.splice(cook.indexOf(currentProductId), 1);
    localStorage.setItem('cart', JSON.stringify(cook));
    
}
exports.increase = function (request, response) {
    var cook;
    currentProductId = request.query.id;
    cook = JSON.parse(localStorage.getItem('cart'));
    cook.push(currentProductId);  
    localStorage.setItem('cart', JSON.stringify(cook));
    response.sendStatus(200);
    
}
exports.remove = function (request, response) {
    currentProductId = request.query.id;
    var cook;
    cook = JSON.parse(localStorage.getItem('cart'));
    cook = cook.filter(product=>product!=currentProductId);
    localStorage.setItem('cart', JSON.stringify(cook));
}
exports.complete = async function (request, response) {
    var cook;
    cook = JSON.parse(localStorage.getItem('cart'));
    await Orders.create({
        orderStatus: 'created',
        UserId: request.user,
        date: new Date().toLocaleDateString()
    })
    var order = await Orders.findOne({
        where: {
            UserId: request.user,
            orderStatus: 'created',
        }
    })
    var filteredCook = unique(cook);
    for(i=0; i<filteredCook.length; i++)
    {
        await OrderedProducts.create({
            count: cook.filter(item => item == filteredCook[i]).length,
            ProductId: filteredCook[i],
            OrderId: order.id
        })
    }
    order.update({
        orderStatus: "in processing"
    })
    localStorage.setItem('cart', []);
}

function unique(arr) {
    let result = [];
    for (let str of arr) {
      if (!result.includes(str)) {
        result.push(str);
      }
    }
    return result;
  }