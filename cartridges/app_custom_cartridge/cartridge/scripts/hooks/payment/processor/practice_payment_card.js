'use strict';

const Transaction = require('dw/system/Transaction');
const PaymentInstrument = require('dw/order/PaymentInstrument');
const PaymentMgr = require('dw/order/PaymentMgr');
const PaymentStatusCodes = require('dw/order/PaymentStatusCodes');
const Resource = require('dw/web/Resource');

/**
 * Creates a token. This should be replaced by utilizing a tokenization provider
 * @returns {string} a token
 */
function createToken() {
    return Math.random().toString(36).substr(2);
}

/**
 * Verifies that entered credit card information is a valid card. If the information is valid a
 * credit card payment instrument is created
 * @param {dw.order.Basket} basket Current users's basket
 * @param {Object} paymentInformation - the payment information
 * @return {Object} returns an error object
 */
function Handle(basket, paymentInformation) {
    const collections = require('*/cartridge/scripts/util/collections');

    let currentBasket = basket;
    let cardErrors = {};
    let cardNumber = paymentInformation.cardNumber.value;
    let cardSecurityCode = paymentInformation.securityCode.value;
    let expirationMonth = paymentInformation.expirationMonth.value;
    let expirationYear = paymentInformation.expirationYear.value;
    let serverErrors = [];
    let creditCardStatus;
    let cardType = paymentInformation.cardType.value;
    let paymentCard = PaymentMgr.getPaymentCard(cardType);

    if (!paymentInformation.creditCardToken) {
        if (paymentCard) {
            creditCardStatus = paymentCard.verify(
                expirationMonth,
                expirationYear,
                cardNumber,
                cardSecurityCode
            );
        } else {
            cardErrors[paymentInformation.cardNumber.htmlName] =
                Resource.msg('error.invalid.card.number', 'creditCard', null);

            return { fieldErrors: [cardErrors], serverErrors: serverErrors, error: true };
        }

        if (creditCardStatus.error) {
            collections.forEach(creditCardStatus.items, function (item) {
                switch (item.code) {
                    case PaymentStatusCodes.CREDITCARD_INVALID_CARD_NUMBER:
                        cardErrors[paymentInformation.cardNumber.htmlName] =
                            Resource.msg('error.invalid.card.number', 'creditCard', null);
                        break;

                    case PaymentStatusCodes.CREDITCARD_INVALID_EXPIRATION_DATE:
                        cardErrors[paymentInformation.expirationMonth.htmlName] =
                            Resource.msg('error.expired.credit.card', 'creditCard', null);
                        cardErrors[paymentInformation.expirationYear.htmlName] =
                            Resource.msg('error.expired.credit.card', 'creditCard', null);
                        break;

                    case PaymentStatusCodes.CREDITCARD_INVALID_SECURITY_CODE:
                        cardErrors[paymentInformation.securityCode.htmlName] =
                            Resource.msg('error.invalid.security.code', 'creditCard', null);
                        break;

                    default:
                        serverErrors.push(Resource.msg('error.card.information.error', 'creditCard', null));
                }
            });

            return { fieldErrors: [cardErrors], serverErrors: serverErrors, error: true };
        }
    }

    Transaction.wrap(function () {
        let paymentInstruments = currentBasket.getPaymentInstruments(
            'practice_payment_card'
        );

        collections.forEach(paymentInstruments, function (item) {
            currentBasket.removePaymentInstrument(item);
        });

        let paymentInstrument = currentBasket.createPaymentInstrument(
            'practice_payment_card', currentBasket.totalGrossPrice
        );

        paymentInstrument.setCreditCardHolder(currentBasket.billingAddress.fullName);
        paymentInstrument.setCreditCardNumber(paymentInformation.cardNumber.value);
        paymentInstrument.setCreditCardType(paymentInformation.cardType.value);
        paymentInstrument.setCreditCardExpirationMonth(paymentInformation.expirationMonth.value);
        paymentInstrument.setCreditCardExpirationYear(paymentInformation.expirationYear.value);
        paymentInstrument.setCreditCardToken(
            paymentInformation.creditCardToken
                ? paymentInformation.creditCardToken
                : createToken()
        );
    });

    return { fieldErrors: null, serverErrors: null, error: false };
}

/**
 * Authorizes a payment using a credit card. Customizations may use other processors and custom
 *      logic to authorize credit card payment.
 * @param {number} orderNumber - The current order's number
 * @param {dw.order.PaymentInstrument} paymentInstrument -  The payment instrument to authorize
 * @param {dw.order.PaymentProcessor} paymentProcessor -  The payment processor of the current
 *      payment method
 * @return {Object} returns an error object
 */
function Authorize(orderNumber, paymentInstrument, paymentProcessor) {
    const Resource = require('dw/web/Resource');

    let serverErrors = [];
    let fieldErrors = {};
    let error = false;

    try {
        if (session.customer.profile.email === 'xxx@host.com') {
            Transaction.wrap(function () {
                paymentInstrument.paymentTransaction.setTransactionID(orderNumber);
                paymentInstrument.paymentTransaction.setPaymentProcessor(paymentProcessor);
            });
        }
        else {
            // throw new Exeption();
        }
    } catch (e) {
        error = true;
        serverErrors.push(
            Resource.msg('error.technical', 'checkout', null)
        );
    }

    return { fieldErrors: fieldErrors, serverErrors: serverErrors, error: error };
}

exports.Handle = Handle;
exports.Authorize = Authorize;
exports.createToken = createToken;
