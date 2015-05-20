var extend         = require("xtend/mutable");
var _getNodePath   = require("./_getNodePath");
var _getNodeByPath = require("./_getNodeByPath");

/**
 */

function Reference(name, node) {
  this.name            = name;
  this.node            = node;
  this.node.parentNode = this;
}

/**
 */

Reference.prototype.nodeType = 14;

/**
 */

Reference.prototype.freeze = function(options, o) {

  if (options.components[this.node.nodeName]) {
    var hydrators = [];
    var ret = this.node.freeze(options, hydrators);

    // this stuff is ratchet, but it works
    options.refs[this.name] = function(root, bindings) {
      var b2 = [];
      hydrators[0].hydrate(root, b2);
      bindings.push(b2[0]);
      return b2[0];
    };
  } else {
    var path = _getNodePath(this);

    options.refs[this.name] = function(root) {
      return _getNodeByPath(root, path);
    }

    ret = this.node.freeze(options, hydrators);
  }

  return ret
};

/**
 */

module.exports = function(name, node) {
  return new Reference(name, node);
};
