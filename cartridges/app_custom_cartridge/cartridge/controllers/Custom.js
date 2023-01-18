'use strict';

/**
 * @namespace Custom
 */

const server = require('server');

var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

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
    const ProductSearchModel = require('dw/catalog/ProductSearchModel');
    const results = new ProductSearchModel();
    const query = req.httpParameterMap.query;

    results.setSearchPhrase(query);
    results.search();

    res.render('search/searchResults', {
        searchResults: results,
        query: query
    });
    next();
}, pageMetaData.computedPageMetaData);

module.exports = server.exports();
