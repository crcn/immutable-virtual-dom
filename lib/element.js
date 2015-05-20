var createSection    = require("./section");
var fragment         = require("./fragment");
var FragmentSection  = require("./_fragmentSection");

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

Element.prototype.freeze = function(options, hydrators) {

  var components = options.components || {};

  if (components[this.nodeName]) {
    return this.freezeComponent(components[this.nodeName], options, hydrators);
  }


  return this.freezeElement(options, hydrators);
};

/**
 */

Element.prototype.freezeComponent = function(clazz, options, hydrators) {
  var section = new FragmentSection(options.document);
  hydrators.push(new ComponentHydrator(clazz, section, fragment.apply(this, this.childNodes)));
  return section.render();
};

/**
 */

Element.prototype.freezeElement = function(options, hydrators) {

  var element = options.document.createElement(this.nodeName);


  for (var attrName in this.attributes) {
    element.setAttribute(attrName, this.attributes[attrName]);
  }

  for (var i = 0, n = this.childNodes.length; i < n; i++) {
    element.appendChild(this.childNodes[i].freeze(options, hydrators));
  }

  return element;
};


/**
*/

function ComponentHydrator(clazz, section, childNodes) {
  this.clazz      = clazz;
  this.section    = section;
  this.childNodes = childNodes;
}

/**
*/

ComponentHydrator.prototype.hydrate = function(root, bindings) {
  if (!this._marker) this._marker = this.section.createMarker();
  bindings.push(new this.clazz(this._marker.createSection(root), this.childNodes));
}


/**
 */

module.exports = function(name, attributes, children) {
  return new Element(name, attributes, Array.prototype.slice.call(arguments, 2));
};
