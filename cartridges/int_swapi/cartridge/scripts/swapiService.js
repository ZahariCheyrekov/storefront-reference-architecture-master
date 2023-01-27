'use strict';

/**
 * It makes call to the service and returns information about the starship
 * @name getStarshipInfo
 * @function
 * @returns {JSON} Response from the swapi api
 */
function getStarshipInfo(data) {
    const swapiService = dw.svc.LocalServiceRegistry.createService(
        'http.swapi.getswapiinfo',
        {
            createRequest: function (svc, args) {
                svc.URL += `${data.category}/${data.id}`;
                svc.setRequestMethod('GET');
                return args;
            },
            parseResponse: function (svc, client) {
                let result;

                try {
                    result = JSON.parse(client.text);
                } catch (error) {
                    result = client.text;
                }

                return result;
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
