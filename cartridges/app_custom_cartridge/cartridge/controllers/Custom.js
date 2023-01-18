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

    res.render('search/searchResultsDemo', {
        searchResults: results,
        query: query,
        format: req.httpParameterMap.format
    });
    next();
}, pageMetaData.computedPageMetaData);

/**
 * Custom-ShowContent : This emdpoint is called to show the content asset template
 * @name Custom-ShowContent
 * @function
 * @memberof ShowContent
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('ShowContent', function (req, res, next) {
    const ContentMgr = require('dw/content/ContentMgr');
    const cid = req.httpParameterMap.cid;
    const content = ContentMgr.getContent(cid);

    res.render('content/contentAsset', {
        content: content
    });
    next();
}, pageMetaData.computedPageMetaData);

module.exports = server.exports();
