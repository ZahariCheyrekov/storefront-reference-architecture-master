var CustomObjectMgr = require('/dw/object/CustomObjectMgr');
var File = require("dw/io/File");
var FileWriter = require("dw/io/FileWriter");
var XMLStreamWriter = require("dw/io/XMLStreamWriter");

module.exports.execute = function () {
    var demoObjectIterator = CustomObjectMgr.getAllCustomObjects('DemoObject');
    var xsw;
    var fileWriter;

    try {
        var file = new File([File.IMPEX, "src", "text.xml"].join(File.SEPARATOR));
        fileWriter = new FileWriter(file);

        xsw = new XMLStreamWriter(fileWriter);
        xsw.writeStartDocument();

        xsw.writeStartElement("products");

        while (demoObjectIterator.hasNext()) {
            var demo = demoObjectIterator.next();
            xsw.writeStartElement("product");
            xsw.writeAttribute("id", demo.custom.camera);
            xsw.writeAttribute("name", demo.custom.photo);
            xsw.writeEndElement();
        }
        xsw.writeEndElement();

    } catch (e) {

    } finally {
        xsw.close();
        fileWriter.close();
    }
}
