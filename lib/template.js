var defaultDocument = require("nofactor");
var View            = require("./view");

/**
 */

function Template(vnode, document) {

  this.vnode = vnode;

  // hydrates nodes when the template is used
  this._hydrators = [];

  // freeze & create the template node immediately
  this._node      = vnode.create(document || defaultDocument, this.hydrators);
}

/**
 * creates a new view
 */

Template.prototype.view = function(context) {

  // TODO - make compatible with IE 8
  var node     = this._node.cloneNode();
  var bindings = [];

  for (var i = 0, n = this._hydrators.length; i < n; i++) {
    this._hydrators[i].hydrate(node, bindings);
  }

  return new View(node, bindings, context);
};

/**
 * TODO - allows for isomorphic apps
 */

Template.prototype.attach = function(node, context) {

};

/**
 */

module.exports = function(vnode) {
  return new Template(vnode);
};
