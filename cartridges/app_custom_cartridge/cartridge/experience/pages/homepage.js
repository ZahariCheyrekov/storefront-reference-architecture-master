'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
/**
 * Render logic for the page.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    // add parameters to model as required for rendering based on the given context (dw.experience.PageScriptContext):
    // * context.page (dw.experience.Page)
    // * context.renderParameters (String)
    // * context.content (dw.util.Map)
    return new Template('experience/pages/homepage').render(model).text;
};
