'use strict';

var server = require('server');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

/**
 * @name Subscribe-Show
 * @funciton
 * @memberof Subscribe
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - csrfProtection.generateToken
 * @param {middleware} - server.middleware.https
 * @param {renders} - isml
 * @param {serverfunction} = get
 */

server.get(
    'Show',
    server.middleware.https,
    csrfProtection.generateToken,
    function (req, res, next) {
        var actionUrl = dw.web.URLUtils.url('Subscribe-Handler');
        var subscriptionDataForm = server.forms.getForm('subscription');
        subscriptionDataForm.clear();

        res.render('subscription/subscriptionForm', {
            actionUrl: actionUrl,
            subscriptionDataForm: subscriptionDataForm,
        });
        next();
    }
);

module.exports = server.exports();
