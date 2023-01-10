'use strict';

var server = require('server');
server.extend(module.superModule);

server.append('Start', function (req, res, next) {
    var viewData = res.getViewData();
    viewData.extendedName = 'John Doe';
    res.setViewData(viewData);
    next();
});

module.exports = server.exports();
