'use strict';

var server = require('server');
server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    res.render('cart/cart');
    next();
});

module.exports = server.exports();
