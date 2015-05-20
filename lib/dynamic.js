var extend        = require("xtend/mutable");
var getNodePath   = require("./_getNodePath");
var getNodeByPath = require("./_getNodeByPath");

/**
 */

function DynamicNode(vnode, handler) {
  this.vnode            = vnode;
  this.handler          = handler;
  this.vnode.parentNode = this;
}

/**
 */

DynamicNode.prototype.create = function(document, hydrators) {
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

function DynamicComponent(vnode, handler) {
  this.vnode   = vnode;
  this.handler = handler;
}

/**
 */

extend(DynamicComponent.prototype, {
  create: function(document, hydrators) {
    var h2 = [];
    var element = this.vnode.create(document, h2);
    hydrators.push(new ComponentHydrator(h2[0], this.handler));
    return element;
  }
});

/**
 */

function ComponentHydrator(hydrator, handler) {
  this.hydrator = hydrator;
  this.handler  = handler;
}

/**
 */

extend(ComponentHydrator.prototype, {
  hydrate: function(root, bindings) {
    var b2 = [];
    this.hydrator.hydrate(root, b2);
    var component = b2[0];
    bindings.push(new ComponentBinding(component, this.handler))
    bindings.push(component);
  }
});

/**
 */

function ComponentBinding(component, handler) {
  this.component = component;
  this.handler   = handler;
}

/**
 */

extend(ComponentBinding.prototype, {
  update: function(context) {
    this.handler(this.component, context);
  }
});

/**
 */

module.exports = function(vnode, handler) {
  if (vnode.nodeType === 13) return new DynamicComponent(vnode, handler);
  return new DynamicNode(vnode, handler);
};
