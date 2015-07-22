var defaultDocument = require("nofactor");
var View            = require("./view");
var extend          = require("xtend/mutable");
var FragmentSection = require("./_fragmentSection");
var NodeSection     = require("./_nodeSection");

function _lowercaseHash(hash) {
  var c1 = hash || {};
  var c2 = {};

  for (var k in c1) {
    c2[k.toLowerCase()] = c1[k];
  }

  return c2;
}

/**
 */

function _lowercaseComponentNames(options) {
  return extend({}, options, {
    components: _lowercaseHash(options.components),
    attributes: options.attributes
  });
}

/**
 */

function Template(vnode, options) {

  this.vnode = vnode;

  // hydrates nodes when the template is used
  this._hydrators = [];

  options = _lowercaseComponentNames(extend({
    document  : defaultDocument
  }, options));

  this.viewClass = options.viewClass || View;

  // freeze & create the template node immediately
  var node = vnode.freeze(options, this._hydrators);

  if (node.nodeType === 11) {
    this.section = new FragmentSection(options.document);
    this.section.appendChild(node);
  } else {
    this.section = new NodeSection(options.document, node);
  }
}

/**
 * creates a new view
 */

Template.prototype.view = function(context, options) {

  // TODO - make compatible with IE 8
  var section     = this.section.clone();

  var view = new this.viewClass(section, this, options);

  for (var i = 0, n = this._hydrators.length; i < n; i++) {
    this._hydrators[i].hydrate(section.node || section.start.parentNode, view);
  }

  if (context) view.update(context);

  // TODO - set section instead of node
  return view;
};

/**
 */

module.exports = function(vnode, options) {
  return new Template(vnode, options);
};
