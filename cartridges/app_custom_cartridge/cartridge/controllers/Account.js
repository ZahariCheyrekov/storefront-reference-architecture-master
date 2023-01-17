'use strict';

/**
 * @namespace Account
 */

var server = require('server');
var page = require('app_storefront_base/cartridge/controllers/Account');
server.extend(page);

var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

/**
 * Checks if the email value entered is correct format
 * @param {string} email - email string to check if valid
 * @returns {boolean} Whether email is valid
 */
function validateEmail(email) {
    var regex = /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;
    return regex.test(email);
}

/**
 * Account-EditProfile : The Account-EditProfile endpoint renders the page that allows a shopper to edit their profile. The edit profile form is prefilled with the shopper's first name, last name, phone number and email
 * @name Base/Account-EditProfile
 * @function
 * @memberof Account
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.generateToken
 * @param {middleware} - userLoggedIn.validateLoggedIn
 * @param {middleware} - consentTracking.consent
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.replace(
    'EditProfile',
    server.middleware.https,
    csrfProtection.generateToken,
    userLoggedIn.validateLoggedIn,
    consentTracking.consent,
    function (req, res, next) {
        var ContentMgr = require('dw/content/ContentMgr');
        var Resource = require('dw/web/Resource');
        var URLUtils = require('dw/web/URLUtils');
        var accountHelpers = require('*/cartridge/scripts/account/accountHelpers');

        var profile = customer.getProfile();

        var accountModel = accountHelpers.getAccountModel(req);
        var content = ContentMgr.getContent('tracking_hint');
        var profileForm = server.forms.getForm('profile');
        profileForm.clear();
        profileForm.customer.interests.value = profile.custom.interests;
        profileForm.customer.country.value = profile.custom.country;
        profileForm.customer.firstname.value = profile.firstName;
        profileForm.customer.lastname.value = profile.lastName;
        profileForm.customer.phone.value = profile.phoneHome;
        profileForm.customer.email.value = profile.email;

        res.render('account/profile', {
            consentApi: Object.prototype.hasOwnProperty.call(req.session.raw, 'setTrackingAllowed'),
            caOnline: content ? content.online : false,
            profileForm: profileForm,
            breadcrumbs: [
                {
                    htmlValue: Resource.msg('global.home', 'common', null),
                    url: URLUtils.home().toString()
                },
                {
                    htmlValue: Resource.msg('page.title.myaccount', 'account', null),
                    url: URLUtils.url('Account-Show').toString()
                }
            ]
        });
        next();
    }
);

module.exports = server.exports();
