'use strict';

/**
 * @namespace Test
 */

const server = require('server');

/**
 * @function
 */
server.get('Show', function (req, res, next) {
    const Session = require('dw/system/Session');

    res.render('test');
    next();
});


module.exports = server.exports();
