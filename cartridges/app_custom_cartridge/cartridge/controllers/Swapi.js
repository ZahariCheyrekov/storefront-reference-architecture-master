'use strict';

/**
 * @namespace Swapi
 */

const server = require('server');
const swapiService = require('*/cartridge/scripts/swapiService');

/**
 * @name Swapi-Show
 * @function
 * Swapi-Show: Used to return a information about the 'Death Star' (starship) from swapi
 * @memberof Swapi
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('Show', function (req, res, next) {
    const { category, id } = req.querystring;
    const swapiInfo = swapiService.getStarshipInfo().call({ category, id }).object;
    const result = JSON.parse(swapiInfo);

    res.render('swapi', {
        swapiInfo: result
    });
    next();
});

module.exports = server.exports();
