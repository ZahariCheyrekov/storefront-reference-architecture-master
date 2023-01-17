'use strict';

/**
 * @namespace Cart
 */

var server = require('server');
server.extend(module.superModule);

/**
 * Cart-Show : Extends the Cart-Show controller from the app_storefront_base
 * @name Cart-Show
 * @function
 * @memberof Cart
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.append('Show', function (req, res, next) {
    res.render('cart/cart');
    next();
});

module.exports = server.exports();
