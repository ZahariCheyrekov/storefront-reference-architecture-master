'use strict';

/**
 * @namespace Test
 */

const server = require('server');

/**
 * @function
 */
server.get('Show', function (req, res, next) {
    const viewData = res.getViewData();

    viewData.customName = 1;
    res.setViewData(viewData);

    res.render('test');
    next();
});


module.exports = server.exports();
