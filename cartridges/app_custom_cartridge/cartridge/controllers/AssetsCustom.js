'use strict';

/**
 * @namespace AssetsCustom
 */

const server = require('server');

const cache = require('*/cartridge/scripts/middleware/cache');
const consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
const pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

/**
 * AssetsCustom-Show : This end point will render a content asset in a custom page
 * @name AssetsCustom-Show
 * @function
 * @memberof AssetsCustom
 * @param {middleware} - cache.applyDefaultCache
 * @param {middleware} - consentTracking.consent
 * @param {querystringparameter} - cid - the id of the content asset to be displayed in the custom page
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('Show', cache.applyDefaultCache, consentTracking.consent, function (req, res, next) {
    const ContentMgr = require('dw/content/ContentMgr');
    const cid = req.httpParameterMap.cid;
    const content = ContentMgr.getContent(cid);

    res.render('custom/contentAsset', {
        content: content
    });

    next();
}, pageMetaData.computedPageMetaData);

module.exports = server.exports();
