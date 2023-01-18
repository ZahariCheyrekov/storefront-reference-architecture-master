'use strict';

/**
 * @namespace Product
 */

var server = require('server');
server.extend(module.superModule);

/**
 * Product-Show : Extends the Cart-Show controller from the app_storefront_base
 * @name Product-Show
 * @function
 * @memberof Product
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.append('Show', function (req, res, next) {
    const viewData = res.getViewData();
    viewData.showPromo = true;

    res.setViewData(viewData);

    res.render('product/productDetails');
    next();
});

module.exports = server.exports();
