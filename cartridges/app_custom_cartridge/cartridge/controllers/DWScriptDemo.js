'use strict';

/**
 * @namespace DWScriptDemo
 */

var server = require('server');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');
var DWScriptModel = require('*/cartridge/models/dwscript');

/**
 * @name Base/DWScriptDemo
 * @function
 * @memberof DWScriptDemo
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('Show', consentTracking.consent, function (req, res, next) {
    var Site = require('dw/system/Site');
    var pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');

    pageMetaHelper.setPageMetaTags(req.pageMetaData, Site.current);

    var dwSriptModel = new DWScriptModel(customer);

    res.render('dwscriptdemo', dwSriptModel);
    next();
}, pageMetaData.computedPageMetaData);

module.exports = server.exports();
