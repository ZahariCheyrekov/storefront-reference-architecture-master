'use strict';

/**
 * @namespace Logger
 */

var server = require('server');

/**
 * Logger-Show :
 * @name Logger-Show
 * @function
 * @memberof Logger
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('Show', function (req, res, next) {
    const Logger = require('dw/system/Logger');
    const group = 'newsletter';
    const logger = Loger.getLogger(group);
    logger.debug('Test log message for {0}', group);

    res.render('exampleA');
    next();
});

module.exports = server.exports();
