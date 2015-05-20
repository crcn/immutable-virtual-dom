var defaultDocument = require("nofactor");
var View            = require("./view");
var extend          = require("xtend/mutable");

/**
 */
 
function _uppercaseComponentNames(options) {
  var c1 = options.components || {};
  var c2 = {};

  for (var k in c1) {
    c2[k.toUpperCase()] = c1[k];
  }

  return extend(options, { components: c2 })
}
/**
 */

function Template(vnode, options) {

  this.vnode = vnode;

  // hydrates nodes when the template is used
  this._hydrators = [];

  // freeze & create the template node immediately
  this._node      = vnode.freeze(_uppercaseComponentNames(extend({
    document  : defaultDocument,
    hydrators : this._hydrators
  }, options)));
}

/**
 * creates a new view
 */

Template.prototype.view = function(context) {

  // TODO - make compatible with IE 8
  var node     = this._node.cloneNode(true);
  var bindings = [];

  for (var i = 0, n = this._hydrators.length; i < n; i++) {
    this._hydrators[i].hydrate(node, bindings);
  }

  return new View(node, bindings, context);
};

/**
 */

module.exports = function(vnode, options) {
  return new Template(vnode, options);
};
