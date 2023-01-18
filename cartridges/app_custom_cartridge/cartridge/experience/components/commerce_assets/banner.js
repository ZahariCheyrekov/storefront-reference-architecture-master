'use strict';
var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for the component.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    // add parameters to model as required for rendering based on the given context (dw.experience.ComponentScriptContext):
    // * context.component (dw.experience.Component)
    // * context.content (dw.util.Map)
    model.bannerMessage = context.content.alt;
    return new Template('experience/components/commerce_assets/banner').render(model).text;
};
