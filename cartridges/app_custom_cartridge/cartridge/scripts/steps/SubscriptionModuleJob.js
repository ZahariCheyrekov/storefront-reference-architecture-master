'use strict';

const CustomObjectMgr = require('dw/object/CustomObjectMgr');
const File = require('dw/io/File');
const FileWriter = require('dw/io/FileWriter');
const CSVStreamWriter = require('dw/io/CSVStreamWriter');
const Transaction = require('dw/system/Transaction');

const OBJECT_TYPE = 'SUBSCRIPTION_FORM';

/**
 * Executes custom job step from subscription form
 * @function
 * @namespace execute
 */
exports.execute = function () {
    const demoObjectIterator = CustomObjectMgr.getAllCustomObjects(OBJECT_TYPE);

    const file = new File(
        [File.IMPEX, 'subscription.csv'].join(File.SEPARATOR)
    );
    const fileWriter = new FileWriter(file);
    const csvw = new CSVStreamWriter(fileWriter);

    csvw.writeNext(['E-Mail', 'First Name', 'Last Name', 'Gender']);
    try {
        while (demoObjectIterator.hasNext()) {
            let curr = demoObjectIterator.next();

            const gender = curr.custom.gender ? curr.custom.gender.value : '';
            csvw.writeNext([
                curr.custom['email'],
                curr.custom.firstName,
                curr.custom.lastName,
                gender,
            ]);

            Transaction.wrap(() => {
                CustomObjectMgr.remove(curr);
            });
        }
    } catch (e) {
        csvw.writeNext(['Error: ', e.message]);
    } finally {
        csvw.close();
        fileWriter.close();
    }
};
