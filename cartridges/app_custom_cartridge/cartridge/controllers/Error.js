'use strict';

/**
 * @namespace Error
 */

var server = require('server');

/**
 * @function
 * @memberof Error
 * @param {renders} - isml
 * @param {serverfunction} - get
 */

server.use('Forbidden', function (req, res, next) {
    var CustomerMgr = require('dw/customer/CustomerMgr');

    CustomerMgr.logoutCustomer(true);
    res.render('error/forbidden');

    next();
});
