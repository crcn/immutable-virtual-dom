var ivd = require("immutable-virtual-dom");

var element = ivd.element("div", dynamic(text(), function(textNode, context) {
  textNode.nodeValue = "Hello";
}));

var tpl = ivd.template(element);
