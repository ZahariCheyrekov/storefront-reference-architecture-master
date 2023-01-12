'use strict';


var ProductMgr = require('dw/catalog/ProductMgr');

/**
 * Accepts productId and returns product by the given id
 * @param {String} productId
 * @returns {dw.catalog.Product | null}
 */
function getProductById(productId) {
    var product = ProductMgr.getProduct(productId);
    return product;
}


/**
 * Accepts productId and returns the primary category of the
 * product within the current site catalog
 * @param {String} productId
 * @returns {String | null}
 */
function getProductCategory(productId) {
    var product = ProductMgr.getProduct(productId);

    if (product) {
        var productCategory = product.getPrimaryCategory();

        if (productCategory) {
            return productCategory.displayName;
        }
    }

    return 'There is no such product with the given id.';
}


/**
 * Accepts productId and returns the price model based on the specified productId
 * @param {String} productId
 * @returns {dw.catalog.ProductPriceModel | null}
 */

function getProductPrices(productId) {
    var product = ProductMgr.getProduct(productId);
    if (product) {
        return product.getPriceModel();
    }

    return null;
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

    if (productId) {
        this.product = getProductById(productId);
        this.productCategory = getProductCategory(productId);
        this.productPriceModel = getProductPrices(productId);
    }
}

module.exports = DWScriptModel;
