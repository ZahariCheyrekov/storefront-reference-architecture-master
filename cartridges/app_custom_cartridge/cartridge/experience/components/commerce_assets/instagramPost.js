'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Renders Instagram post from the given url
 * @function
 * @param {Template} - Reads an ISML template from the file system and renders it into a MimeEncodedText object
 * @param {HashMap} - Represents a hash map of objects
 * @param {string} instagramURL - the url of the given Instagram post
 */
module.exports.render = function (context) {
    var model = new HashMap();
    model.instagramPostURL = context.content.instagramURL;

    return new Template('experience/components/commerce_assets/instagramPost')
        .render(model).text;
};
