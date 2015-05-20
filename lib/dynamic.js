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

DynamicNode.prototype.freeze = function(options) {
  if (options.components[this.vnode.nodeName]) {
    return this.freezeComponent(options);
  } else {
    return this.freezeElement(options);
  }
};

/**
 */

DynamicNode.prototype.freezeComponent = function(options) {
  var h2 = [];
  var element = this.vnode.freeze(extend({}, options, { hydrators: h2 }));
  options.hydrators.push(new ComponentHydrator(h2[0], this.handler));
  return element;
};

/**
 */

DynamicNode.prototype.freezeElement = function(options) {
  var node = this.vnode.freeze(options);
  options.hydrators.push(new Hydrator(node, this.handler));
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
  return new DynamicNode(vnode, handler);
};
