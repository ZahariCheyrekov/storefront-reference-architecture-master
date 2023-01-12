'use strict';

/**
 * Function accepts productId and returns product by the given id
 * @param {String} productId
 * @returns {dw.catalog.Product | null}
 */
function getProductById(productId) {
    var ProductMgr = require('dw/catalog/ProductMgr');
    var product = ProductMgr.getProduct(productId);
    return product;
}

















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
function DWScriptModel(customer, productId, customerId) {
    this.ID = getCustomerID(customer);
    this.product = getProductById(productId);
    this.productCategory = getProductCategory(productId);
}

module.exports = DWScriptModel;
