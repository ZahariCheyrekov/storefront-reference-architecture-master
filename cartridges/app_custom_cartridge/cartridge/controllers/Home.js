'use strict';

/**
 * @namespace Home
 */

/**
 * @function
 * extends Home controller from app_storefront_base
 */

var server = require('server');
var HookMgr = require('dw/system/HookMgr');
server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var viewData = res.getViewData();
    viewData.extendedName = 'John Doe';

    var data;
    if (HookMgr.hasHook('app.scripts.hooks.editViewData')) {
        data = HookMgr.callHook('app.scripts.hooks.editViewData', 'edit', viewData);
    }

    res.setViewData(data);

    // show the user slot data
    // res.render('slots/content/userSlotHtml');
    next();
});

module.exports = server.exports();
