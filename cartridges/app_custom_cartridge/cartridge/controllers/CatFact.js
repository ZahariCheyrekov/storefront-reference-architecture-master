'use strict';

/**
 * @namespace CatFact
 */

const server = require('server');
const cache = require('*/cartridge/scripts/middleware/cache');

/**
 * @name CatFact-ShowHTTP
 * @function
 * CatFact-ShowHTTP: Used to return a fact about cats
 * @memberof CatFact
 * @param {middleware} - cache.applyDefaultCache
 * @param {middleware} - server.middleware.include
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('Show',
    server.middleware.include,
    cache.applyDefaultCache,
    function (req, res, next) {
        const httpClient = new dw.net.HTTPClient();
        httpClient.open('GET', 'https://catfact.ninja/fact');
        httpClient.send();

        const catFact = JSON.parse(httpClient.text);

        res.render('catHTTP', {
            catFact: catFact
        });
        next();
    }
);

module.exports = server.exports();
