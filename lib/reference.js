/**
 */

function Reference(name, node) {
  this.name            = name;
  this.node            = node;
  this.node.parentNode = this;
}

/**
 */

Reference.prototype.nodeType = 14;

/**
 */

Reference.prototype.create = function(document, hydrators) {
  return this.node.create(document, hydrators);
};

/**
 */

module.exports = function(name, node) {
  return new Reference(name, node);
};
