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
                svc.addHeader('Content-Type', 'application/json');
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
            }
        });

    const serviceResponse = swapiService.call().object;
    return serviceResponse;
}

module.exports = {
    getStarshipInfo: getStarshipInfo
};
