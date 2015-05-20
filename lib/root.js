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

  hydrators.unshift(new Hydrator(refs, this.handler, options));

  return ret;
}

/**
 */

function Hydrator(refPaths, handler, options) {
  this.refPaths = refPaths;
  this.handler  = handler;
  this.options  = options;
}

/**
 */

Hydrator.prototype.hydrate = function(root, bindings) {
  var refs = {};

  for (var refName in this.refPaths) {
    refs[refName] = this.refPaths[refName](root, bindings);
  }

  bindings.unshift(new Binding(refs, this.handler, this.options));
}

/**
 */

function Binding(refs, handler, options) {
  this.refs    = refs;
  this.handler = handler;
  this.options = options;
}

/**
 */

Binding.prototype.update = function(context) {
  this.handler.call(this, this.refs, context);
};


/**
 */

module.exports = function(node, handler) {
  return new Root(node, handler);
}
