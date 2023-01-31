var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var { File, FileWriter, XMLStreamWriter } = require('dw/io');

module.exports.execute = function () {
    var demoObjectIterator = CustomObjectMgr.getAllCustomObjects('DemoObject');

    var xsw;
    var file;
    var fileWriter;

    try {
        file = new File([File.IMPEX, 'src', 'text.xml'].join(File.SEPARATOR));
        fileWriter = new FileWriter(file);

        xsw = new XMLStreamWriter(fileWriter);

        xsw.writeStartDocument();
        xsw.writeStartElement('products');


        while (demoObjectIterator.hasNext()) {
            var demo = demoObjectIterator.next();
            xsw.writeStartElement('product');
            xsw.writeAttribute('id', demo.custom.camera);
            xsw.writeAttribute('name', demo.custom.photo);
            xsw.writeEndElement();
        }
        xsw.writeEndElement();

    } catch (error) {

    } finally {
        xsw.close();
        fileWriter.close();
    }
}
