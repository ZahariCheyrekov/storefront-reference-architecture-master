'use strict';

/**
 * @returns
 */
function getCustomerID(customer) {
    return customer.getID();
}

/**
 *
 * @param {*} customer
 */
function DWScriptModel(customer) {
    this.ID = getCustomerID(customer);
}

module.exports = DWScriptModel;
