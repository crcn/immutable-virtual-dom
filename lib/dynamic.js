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

DynamicNode.prototype.freeze = function(options, hydrators) {
  if (options.components[this.vnode.nodeName]) {
    return this.freezeComponent(options, hydrators);
  } else {
    return this.freezeElement(options, hydrators);
  }
};

/**
 */

DynamicNode.prototype.freezeComponent = function(options, hydrators) {
  var h2 = [];
  var element = this.vnode.freeze(options, h2);
  hydrators.push(new ComponentHydrator(h2[0], this.handler, options));
  return element;
};

/**
 */

DynamicNode.prototype.freezeElement = function(options, hydrators) {
  var node = this.vnode.freeze(options, hydrators);
  hydrators.push(new Hydrator(node, this.handler, options));
  return node;
};

/**
 */

function Hydrator(ref, handler, options) {
  this.options = options;
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
    bindings.push(new Binding(getNodeByPath(root, this._refPath), this.handler, this.options));
  }
});

/**
 */

function Binding(ref, handler, options) {
  this.ref     = ref;
  this.handler = handler;
  this.options = options;
}

/**
 */

extend(Binding.prototype, {
  update: function(context) {
    this.handler.call(this, this.ref, context);
  }
});

/**
 */

function ComponentHydrator(hydrator, handler, options) {
  this.options  = options;
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
    bindings.push(new ComponentBinding(component, this.handler, this.options));
    bindings.push(component);
  }
});

/**
 */

function ComponentBinding(component, handler, options) {
  this.component = component;
  this.handler   = handler;
  this.options   = options;
}

/**
 */

extend(ComponentBinding.prototype, {
  update: function(context) {
    this.handler.call(this, this.component, context);
  }
});

/**
 */

module.exports = function(vnode, handler) {
  return new DynamicNode(vnode, handler);
};
