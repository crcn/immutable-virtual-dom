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

Reference.prototype.freeze = function(options) {
  return this.node.freeze(options);
};

/**
 */

module.exports = function(name, node) {
  return new Reference(name, node);
};
