'use strict';

/**
 * @namespace CatFact
 */

const server = require('server');
const catFactService = require('*/cartridge/scripts/catFactService');
const cache = require('*/cartridge/scripts/middleware/cache');

/**
 * @name CatFact-ShowHTTP
 * @function
 * CatFact-ShowHTTP: Used to return a fact about cats
 * @memberof CatFact
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('ShowHTTP', function (req, res, next) {
    const httpClient = new dw.net.HTTPClient();
    httpClient.open('GET', 'https://catfact.ninja/fact');
    httpClient.send();

    const catFact = JSON.parse(httpClient.text);

    res.render('catHTTP', {
        catFact: catFact
    });
    next();
});

/**
 * @name CatFact-ShowService
 * @function
 * CatFact-ShowService: Used to return a random fact about cats
 * @memberof CatFact
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('ShowService', function (req, res, next) {
    const catFact = JSON.parse(catFactService.getCatFact());

    res.render('catService', {
        catFact: catFact
    });
    next();
});

module.exports = server.exports();
