'use strict';

/**
 * @namespace Home
 */

/**
 * @function
 * extends Home controller from app_storefront_base
 */

var server = require('server');
server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var viewData = res.getViewData();
    viewData.extendedName = 'John Doe';

    var editViewData = require('*/cartridge/scripts/hooks/editViewData.js');
    var data = editViewData(viewData);

    res.setViewData(data);
    next();
});

module.exports = server.exports();
