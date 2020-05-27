exports.exit = function (request, response) {
    request.logout();
    response.redirect('/entry');
};