'use strict';

/**
 * @namespace Test
 */

const server = require('server');

/**
 * Test-Show : This endpoint is called to show the test isml template
 * @name Test-Show
 * @function
 * @memberof Test
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('Show', function (req, res, next) {
    res.render('test');
    next();
});

module.exports = server.exports();
