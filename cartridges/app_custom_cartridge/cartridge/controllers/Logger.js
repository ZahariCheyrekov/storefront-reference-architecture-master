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
    const logger = Logger.getLogger(group);
    logger.debug('Test log message for {0}', group);

    const ArrayList = require('dw/util/ArrayList');
    const arraylist = new ArrayList();

    for (let index = 0; index < 25000; index++) {
        arraylist.push({
            test: 'test'
        });
    }

    res.render('example/exampleA');
    next();
});

module.exports = server.exports();
