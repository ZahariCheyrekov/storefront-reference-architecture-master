'use strict';

var server = require('server');

server.get('Show', function (req, res, next) {
    var address = require('~/cartridge/models/address');
    var CustomerMgr = require('dw/customer/CustomerMgr');

    const demo_prop = 'I am new property';

    var customer = CustomerMgr.getCustomerByCustomerNumber('00000001');
    var rawAddressBook = customer.getAddressBook().getAddress('new_address');

    const result = new address(rawAddressBook, demo_prop);
    res.json({ msg: 'Extended module result', result, req });
    next();
});

module.exports = server.exports();
