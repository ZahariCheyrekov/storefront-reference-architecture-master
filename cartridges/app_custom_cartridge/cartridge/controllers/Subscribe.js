'use strict';

var server = require('server');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

/**
 * Subscribe-Show: This endpoint is called when user type Subscribe-Show
 * @name Subscribe-Show
 * @funciton
 * @memberof Subscribe
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - csrfProtection.generateToken
 * @param {middleware} - server.middleware.https
 * @param {renders} - isml
 * @param {serverfunction} - get
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

/**
 * Subscribe-Handler: This endpoint is called when subscription form is submited
 * @name Subscribe-Hanler
 * @funciton
 * @memberof Subscribe
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - csrfProtection.generateToken
 * @param {middleware} - server.middleware.https
 * @param {renders} - isml
 * @param {serverfunction} - post
 */
server.post(
    'Handler',
    csrfProtection.validateAjaxRequest,
    server.middleware.https,
    function (req, res, next) {
        var subscriptionDataForm = server.forms.getForm('subscription');
        var URLUtils = require('dw/web/URLUtils');
        var CustomObjectMgr = require('dw/object/CustomObjectMgr');
        var Transaction = require('dw/system/Transaction');
        var UUIDUtils = require('dw/util/UUIDUtils');

        Transaction.wrap(function () {
            var CustomObject = CustomObjectMgr.createCustomObject(
                'SUBSCRIPTION_FORM',
                subscriptionDataForm.email.value
            );
            CustomObject.custom.firstName = subscriptionDataForm.firstName.value;
            CustomObject.custom.lastName = subscriptionDataForm.lastName.value;
            CustomObject.custom.email = subscriptionDataForm.email.value;
            // CustomObject.custom.gender = subscriptionDataForm.gender.value;

            res.json({
                success: true,
                redirectUrl: URLUtils.url(
                    'Subscribe-Show'
                ).toString(),
            });
        });
        next();
    }
);

module.exports = server.exports();
