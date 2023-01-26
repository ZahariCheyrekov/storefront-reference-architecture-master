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
    const swapiInfo = JSON.parse(swapiService.getStarshipInfo());

    res.render('swapi', {
        swapiInfo: swapiInfo
    });
    next();
});

module.exports = server.exports();
