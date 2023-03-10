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
                svc.URL += `${args.category}/${args.id}`;
                svc.setRequestMethod('GET');
                return args;
            },
            parseResponse: function (svc, client) {
                return client.text;
            },
            filterLogMessage: function (msg) {
                return msg.replace(
                    /cost_in_credits":"\d+/,
                    "cost_in_credits: $$$$$$$$$$$$$$$$$$$"
                );
            }
        });

    return swapiService;
}

module.exports = {
    getStarshipInfo: getStarshipInfo
};
