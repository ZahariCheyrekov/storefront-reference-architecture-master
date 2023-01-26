'use strict';

/**
 * It makes call to the service and returns random fact about cat
 * @name getCatFact
 * @function
 * @returns {JSON} Response from the cat fact api
 */
function getCatFact() {
    const catFactService = dw.svc.LocalServiceRegistry.createService(
        'http.catfact.getcatfact',
        {
            createRequest: function (svc, args) {
                svc.setRequestMethod('GET');
                return args;
            },
            parseResponse: function (svc, client) {
                return client.text;
            }
        });

    const serviceResponse = catFactService.call().object;
    return serviceResponse;
}

module.exports = {
    getCatFact: getCatFact
};
