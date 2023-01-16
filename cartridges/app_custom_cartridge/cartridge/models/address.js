'use strict';

var base = module.superModule;

/**
 * Extended address class that represents and OrderAddress
 * @param {dw.order.OrderAddress} addressObject - User's address
 * @constructor
 */
function address(addressObject, demo_prop) {
    base.call(this, addressObject);

    if (addressObject && demo_prop && !this.address.modifiedProperty) {
        Object.defineProperty(this.address, 'modifiedProperty', {
            enumerable: true,
            value: demo_prop
        });
    }
}

module.exports = address;
