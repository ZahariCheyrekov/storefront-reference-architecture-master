'use strict';

function address(object, demo_prop) {
    module.superModule.call(this, object);

    Object.defineProperty(object, 'demo_prop', {
        enumerable: true,
        value: demo_prop
    });

    this.address = object;
}

'use strict';

var base = module.superModule;
var addressHelpers = require('*/cartridge/scripts/helpers/addressHelpers');

/**

function address(addressObject) {
    base.call(this, addressObject);

    if (this.address && !!this.address.city) {
        this.address.city = addressHelpers.findCurrentCityValue(this.address.city, request.locale);
    }

    if (this.address && !!this.address.stateCode && this.address.stateCode.length) {
        this.address.stateCode = addressHelpers.findCurrentStateValue(this.address.stateCode, request.locale);
    }


}

module.exports = address;
