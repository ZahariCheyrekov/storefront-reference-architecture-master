'use strict';

/**
 * @namespace New
 */

var server = require('server');
var userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');

/**
 * @function
 * @memberof Error
 * @param {renders} - json
 * @param {serverfunction} - get/post
 */
server.get('Show', userLoggedIn.validateLoggedIn, function (req, res, next) {
    const address = require('*/cartridge/models/address');
    const CustomerMgr = require('dw/customer/CustomerMgr');

    const demo_prop = 'I am new property';

    const customer = CustomerMgr.getCustomerByCustomerNumber('00000001');

    if (customer) {
        const rawAddressBook = customer.getAddressBook().getAddress('new_address');

        if (rawAddressBook) {
            const result = new address(rawAddressBook, demo_prop);
            return res.json({ msg: 'Extended module result', result, req });
        }

        return res.json({ msg: 'There is no such address in the customer book', customer, req });
    }

    res.json({ msg: 'There is no such customer' });
    next();
});

module.exports = server.exports();
