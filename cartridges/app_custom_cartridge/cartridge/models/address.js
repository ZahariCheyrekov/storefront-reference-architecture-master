'use strict';

function address(object, demo_prop) {
    module.superModule.call(this, object);

    if (object && demo_prop && !this.address.modifiedProperty) {
        Object.defineProperty(this.address, 'modifiedProperty', {
            enumerable: true,
            value: demo_prop
        });
    }
}

// 'use strict';

// var base = module.superModule;
// var addressHelpers = require('*/cartridge/scripts/helpers/addressHelpers');

// /**
//  * Address class that represents and orderAddress
//  * @param {dw.order.OrderAddress} addressObject - User's address
//  * @constructor
//  */
// function address(addressObject, demo_prop) {
//     base.call(this, addressObject);

//     if (this.address && !!this.address.city) {
//         this.address.city = addressHelpers.findCurrentCityValue(this.address.city, request.locale);
//     }

//     if (this.address && !!this.address.stateCode && this.address.stateCode.length) {
//         this.address.stateCode = addressHelpers.findCurrentStateValue(this.address.stateCode, request.locale);
//     }

//     if (this.address && addressObject && addressObject.custom && 'storeID' in addressObject.custom &&
//         addressObject.custom.storeID) {
//         this.storeID = addressObject.custom.storeID;
//     }

//     if (this.address && addressObject && addressObject.phone && addressObject.custom && 'phoneCode' in addressObject.custom &&
//         addressObject.custom.phoneCode) {
//         this.address.phoneCode = addressObject.custom.phoneCode;
//         this.address.phone = addressObject.phone.replace(addressObject.custom.phoneCode, '');
//     }

//     if (this.address && addressObject && addressObject.phone && 'raw' in addressObject && 'custom' in addressObject.raw &&
//         addressObject.raw.custom.phoneCode) {
//         this.address.phoneCode = addressObject.raw.custom.phoneCode;
//         this.address.phone = addressObject.phone.replace(addressObject.raw.custom.phoneCode, '');
//     }

//     if (addressObject && demo_prop && !this.address.modifiedProperty) {
//         Object.defineProperty(this.address, 'modifiedProperty', {
//             enumerable: true,
//             value: demo_prop
//         });
//     }
// }

module.exports = address;
