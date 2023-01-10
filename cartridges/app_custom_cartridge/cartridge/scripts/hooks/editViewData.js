/* eslint-disable no-param-reassign */
/**
 * @function
 * @param {Object} viewData - the viewData to be extended
 * @returns {Object} the result of extended viewData
 *
 */
function editViewData(viewData) {
    viewData.extendedPlayerLevel = 100;
    return viewData;
}

module.exports = editViewData;
