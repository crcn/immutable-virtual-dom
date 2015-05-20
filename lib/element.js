var component = require("./component");

/**
 */

function Element(nodeName, attributes, childNodes) {
  this.nodeName   = String(nodeName).toUpperCase();
  this.attributes = attributes;
  this.childNodes = childNodes;
  for (var i = childNodes.length; i--;) childNodes[i].parentNode = this;
}

/**
 */

Element.prototype.nodeType = 1;

/**
 */

Element.prototype.create = function(document, hydrators) {
  var element = document.createElement(this.nodeName);

  for (var attrName in this.attributes) {
    element.setAttribute(attrName, this.attributes[attrName]);
  }

  for (var i = 0, n = this.childNodes.length; i < n; i++) {
    element.appendChild(this.childNodes[i].create(document, hydrators));
  }

  return element;
};

/**
 */

module.exports = function(name, attributes, children) {
  if (typeof name !== "string") return component(name, attributes, children);
  return new Element(name, attributes, Array.prototype.slice.call(arguments, 2));
};
