'use strict';

/**
 * @namespace Custom
 */

const server = require('server');

/**
 * Custom-List : This emdpoint is called to show the search results of the page
 * @name Custom-List
 * @function
 * @memberof SearchRes
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('List', function (req, res, next) {
    const query = req.httpParameterMap.query;

    res.render('search/searchResults', {
        query: query
    });
    next();
});

module.exports = server.exports();
