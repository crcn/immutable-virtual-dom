var extend        = require("xtend/mutable");
var getNodePath   = require("./_getNodePath");
var getNodeByPath = require("./_getNodeByPath");

/**
 */

function Dynamic(vnode, handler) {
  this.vnode   = vnode;
  this.handler = handler;
}

/**
 */

Dynamic.prototype.create = function(document, hydrators) {
  var node = this.vnode.create(document, hydrators);
  hydrators.push(new Hydrator(node, this.handler));
  return node;
};

/**
 */

function Hydrator(ref, handler) {
  this.ref     = ref;
  this.handler = handler;
}

/**
 */

extend(Hydrator.prototype, {

  /**
   */

  hydrate: function(root, bindings) {
    if (!this._refPath) this._refPath = getNodePath(this.ref);
    bindings.push(new Binding(getNodeByPath(root, this._refPath), this.handler));
  }
});

/**
 */
 
function Binding(ref, handler) {
  this.ref     = ref;
  this.handler = handler;
}

/**
 */

extend(Binding.prototype, {
  update: function(context) {
    this.handler(this.ref, context);
  }
});

/**
 */

module.exports = function(vnode, handler) {
  return new Dynamic(vnode, handler);
};
