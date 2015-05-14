var createSection    = require("./section");
var fragment         = require("./fragment");
var FragmentSection  = require("./_fragmentSection");

/**
*/

function Component(clazz, attributes, childNodes) {
  this.clazz      = clazz;
  this.attributes = attributes;
  this.childNodes = childNodes;
}

/**
*/

Component.prototype.nodeType = 13; // component

/**
*/

Component.prototype.create = function(document, hydrators) {
  var section = new FragmentSection(document);
  hydrators.push(new Hydrator(this.clazz, section, this.childNodes));
  return section.render();
};

/**
*/

function Hydrator(clazz, section, childNodes) {
  this.clazz      = clazz;
  this.section    = section;
  this.childNodes = childNodes;
}

/**
*/

Hydrator.prototype.hydrate = function(root, bindings) {
  if (!this._marker) this._marker = this.section.createMarker();
  bindings.push(new this.clazz(this._marker.createSection(root), this.childNodes));
}

/**
*/

module.exports = function(clazz, attributes, children) {
  return new Component(clazz, attributes, fragment.apply(this, Array.prototype.slice.call(arguments, 2)));
};
