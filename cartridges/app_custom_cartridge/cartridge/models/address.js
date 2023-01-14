'use strict';

function address(object, demo_prop) {
    module.superModule.call(this, object);

    Object.defineProperty(object, 'demo_prop', {
        enumerable: true,
        value: demo_prop
    });

    return object;
}

module.exports = address;
