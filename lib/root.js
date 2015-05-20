var _getNodeByPath = require("./_getNodeByPath");
var _getNodePath   = require("./_getNodePath");

/**
 */

function _findRefs(node, refs) {
  if (node.nodeType === 14) refs.push(node);
  if (node.childNodes) {
    for (var i = node.childNodes.length; i--;) _findRefs(node.childNodes[i], refs);
  }
  return refs;
}

/**
 */

function Root(node, handler) {
  this.node    = node;
  this.handler = handler;
}

/**
 */

Root.prototype.freeze = function(options) {

  var refPaths = {};
  var refs     = _findRefs(this.node, [])
  for (var i = refs.length; i--;) {
    var ref = refs[i];
    refPaths[ref.name] = _getNodePath(ref);
  }

  options.hydrators.push(new Hydrator(refPaths, this.handler));

  return this.node.freeze(options);
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
    refs[refName] = _getNodeByPath(root, this.refPaths[refName]);
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
