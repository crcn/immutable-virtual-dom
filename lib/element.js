
/**
 */

function Element(nodeName, attributes, childNodes) {
  this.nodeName   = String(nodeName).toUpperCase();
  this.attributes = attributes;
  this.childNodes = childNodes;
}

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
  return new Element(name, attributes, Array.prototype.slice.call(arguments, 2));
};