'use strict';

var server = require('server');

server.get('Show', function (req, res, next) {
    var address = require('~/cartridge/models/address');

    const demo_prop = 'I am new property';
    const result = new address({}, demo_prop);

    res.json({ msg: 'Extended module result', result, req });
    next();
});

module.exports = server.exports();
