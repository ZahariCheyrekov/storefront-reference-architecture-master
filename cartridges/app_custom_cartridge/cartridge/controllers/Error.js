'use strict';

/**
 * @namespace Error
 */

var server = require('server');

/**
 * @function
 * @memberof Error
 * @param {renders} - isml
 * @param {serverfunction} - get/post
 */
server.use('Start', function (req, res, next) {
    var URLUtils = require('dw/web/URLUtils');
    var errorText = req.error;

    if (errorText === 'Secure connection required for this request.' &&
        !req.httpSecure &&
        (req.httpHeaders.containsKey('x-is-request_method')) &&
        (req.httpHeaders['x-is-request_method'] === 'GET')) {
        res.redirect(URLUtils.url('error'));
    }

    if (req.getHttpHeaders().get("x-requested-with") != null &&
        req.getHttpHeaders().get("x-requested-with") === "XMLHttpRequest") {

        if (req.httpHeaders['Content-Type'] === 'application/json') {
            res.render('error/generalerrorjson');
        }
    }

    res.render('error/generalerror')
    next();
});

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

module.exports = server.exports();
