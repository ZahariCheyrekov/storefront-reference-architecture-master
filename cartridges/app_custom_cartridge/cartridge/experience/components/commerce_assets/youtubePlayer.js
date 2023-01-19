'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Renders iframe with YouTube video from the given id
 * @function
 * @param {Template} - Reads an ISML template from the file system and renders it into a MimeEncodedText object
 * @param {HashMap} - Represents a hash map of objects
 * @param {string} youtubeID - the id of the given YouTube video
 */
module.exports.render = function (context) {
    var model = new HashMap();
    model.youtubeVideoID = context.content.youtubeID;

    return new Template('experience/components/commerce_assets/youtubePlayer')
        .render(model).text;
};
