var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var File = require('dw/io/File');
var FileWriter = require('dw/io/FileWriter');
var CSVStreamWriter = require('dw/io/CSVStreamWriter');

module.exports.execute = function () {
    var sfCustomObject = CustomObjectMgr.getAllCustomObjects('SUBSCRIPTION_FORM');

    var fileWriter;
    var csv;

    try {
        var file = new File([File.IMPEX, 'subscription.csv'].join(File.SEPARATOR));
        fileWriter = new FileWriter(file);

        csv = new CSVStreamWriter(fileWriter);

        while (sfCustomObject.hasNext()) {
            var sfObject = sfCustomObject.next();
            csv.writeNext(sfObject.firstName);
            csv.writeNext(sfObject.lastName);
            csv.writeNext(sfObject.email);

            Transaction.wrap(function () {
                CustomObjetMgr.remove(sfObject);
            });
        }
    } catch (e) {
    } finally {
        csv.close();
        fileWriter.close();
    }
};
