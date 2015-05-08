var Binding = require("./binding");

/**
 */

function Dynamic(vnode, handler) {
  this.vnode   = vnode;
  this.handler = handler;
}

/**
 */

Dynamic.prototype.create = function(document, bindings) {
  var node = this.vnode.create(document, bindings);
  bindings.push(new Binding(node, this.handler));
  return node;
};

/**
 */

module.exports = function(vnode, handler) {
  return new Dynamic(vnode, handler);
};
