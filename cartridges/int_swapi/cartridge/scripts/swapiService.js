'use strict';

/**
 * It makes call to the service and returns information about the starship
 * @name getStarshipInfo
 * @function
 * @returns {JSON} Response from the swapi api
 */
function getStarshipInfo() {
    const swapiService = dw.svc.LocalServiceRegistry.createService(
        'http.swapi.getswapiinfo',
        {
            createRequest: function (svc, args) {
                svc.setRequestMethod('GET');
                return args;
            },
            parseResponse: function (svc, client) {
                return client.text;
            },
            filterLogMessage: function (msg) {
                return msg.replace(
                    /cost_in_credits\: \".*?\"/,
                    "cost_in_credits:$$$$$$$$$$$$$$$$$$$"
                );
            },
            getRequestLogMessage: function(msg) {
                // Convert to a String here, doing any filtering...
                return msg;
            },
            getResponseLogMessage: function(msg) {
                // Convert to a String here, doing any filtering...
                return msg;
            }
        });

    const serviceResponse = swapiService.call().object;
    return serviceResponse;
}

module.exports = {
    getStarshipInfo: getStarshipInfo
};
