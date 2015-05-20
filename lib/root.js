var _getNodeByPath = require("./_getNodeByPath");
var _getNodePath   = require("./_getNodePath");

/**
 */

function Root(node, handler) {
  this.node    = node;
  this.handler = handler;
}

/**
 */

Root.prototype.freeze = function(options, hydrators) {

  var refs     = {};

  options.refs = refs;
  var ret = this.node.freeze(options, hydrators);

  hydrators.unshift(new Hydrator(refs, this.handler));

  return ret;
}

/**
 */

function Hydrator(refPaths, handler) {
  this.refPaths = refPaths;
  this.handler  = handler;
}

/**
 */

Hydrator.prototype.hydrate = function(root, bindings) {
  var refs = {};

  for (var refName in this.refPaths) {
    refs[refName] = this.refPaths[refName](root, bindings);
  }

  bindings.push(new Binding(refs, this.handler));
}

/**
 */

function Binding(refs, handler) {
  this.refs    = refs;
  this.handler = handler;
}

/**
 */

Binding.prototype.update = function(context) {
  this.handler(this.refs, context);
};


/**
 */

module.exports = function(node, handler) {
  return new Root(node, handler);
}
