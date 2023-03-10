'use strict';

var ProductMgr = require('dw/catalog/ProductMgr');
var CustomerMgr = require('dw/customer/CustomerMgr');

/**
 * @function getProductById
 * Returns product by the given id
 * @param {string} productId
 * @returns {dw.catalog.Product | null}
 */
function getProductById(productId) {
    var product = ProductMgr.getProduct(productId);
    return product;
}


/**
 * @function getProductCategory
 * Returns the primary category of the product within the current site catalog
 * @param {string} productId
 * @returns {string | null}
 */
function getProductCategory(productId) {
    var product = getProductById(productId);

    if (product) {
        var productCategory = product.getPrimaryCategory();

        if (productCategory) {
            return productCategory.displayName;
        }
    }

    return null;
}


/**
 * @function getProductPrices
 * Returns the price model based on the specified productId
 * @param {string} productId
 * @returns {dw.catalog.ProductPriceModel | null}
 */
function getProductPrices(productId) {
    var product = getProductById(productId);

    if (product) {
        var priceModel = product.getPriceModel();
        return priceModel;
    }

    return null;
}


/**
 * @function getProductCategories
 * Returns all category assignments for this product in any catalog
 * @param {String} productId
 * @returns {Object | null}
 */
function getProductCategories(productId) {
    var product = getProductById(productId);

    if (product) {
        return product.getAllCategories();
    }

    return null;
}


/**
 * @function getCustomerById
 * Returns the customer with the specified customer number
 * @param {string} customerId
 * @returns {dw.customer.Customer | null}
 */
function getCustomerById(customerId) {
    var customer = CustomerMgr.getCustomerByCustomerNumber(customerId);
    return customer;
}


/**
 * @function isCustomerAssignedToGroup
 * Returns true if the customer is member of the specified CustomerGroup
 * @param {string} customerId
 * @param {string} groupId
 * @returns {boolean}
 */
function isCustomerAssignedToGroup(customerId, groupId) {
    var customer = getCustomerById(customerId);

    if (customer) {
        return customer.isMemberOfCustomerGroup(groupId);
    }

    return false;
}


/**
 * @constructor
 * @param {string} productId
 * @param {string} customerId
 */
function DWScriptModel(productId, customerId, groupId) {
    if (productId) {
        this.product = getProductById(productId);
        this.productName = getProductById(productId);
        this.productCategory = getProductCategory(productId);
        this.productPriceModel = getProductPrices(productId);
        this.productCategories = getProductCategories(productId);
    }

    if (customerId) {
        this.customerById = getCustomerById(customerId);

        if (customerId && groupId) {
            this.isAssignedToGroup = isCustomerAssignedToGroup(customerId, groupId);
        }
    }
}

module.exports = DWScriptModel;
