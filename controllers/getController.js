exports.entry = function (request, response) {
    if (request.isAuthenticated()) 
    {
        response.render("entry", {login:false, 
        message: request.flash()}); 
    }
    else
    {
        response.render("entry", {login:false,
        message: request.flash()});        
    }
};
exports.cart = function (request, response) {
    if (request.isAuthenticated()) 
    {
        response.render("cart", {login:true});
    }
    else
    {
        response.render("cart", {login:false});        
    }
};
exports.catalog = function (request, response) {
    if (request.isAuthenticated()) 
    {
        response.render("catalog", {login:true});
    }
    else
    {
        response.render("catalog", {login:false});        
    }
};
exports.contact = function (request, response) {
    if (request.isAuthenticated()) 
    {
        response.render("contact", {login:true});
    }
    else
    {
        response.render("contact", {login:false});        
    }
};

exports.main = function (request, response) {
    if (request.isAuthenticated()) 
    {
        response.render("home", {login:true});
    }
    else
    {
        response.render("home", {login:false});        
    }
};
exports.about = function (request, response) {
    if (request.isAuthenticated()) {
     response.render("about", {login:true});
    }
    else{
     response.render("about", {login:false});        
    }
};

