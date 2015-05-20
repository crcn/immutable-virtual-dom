var component = require("./component");

/**
 */

function Fragment(childNodes) {
  this.childNodes = childNodes;
  for (var i = childNodes.length; i--;) childNodes[i].parentNode = this;
}

/**
 */

Fragment.prototype.nodeType = 11;

/**
 */

Fragment.prototype.freeze = function(options) {

  var fragment = options.document.createDocumentFragment();

  for (var i = 0, n = this.childNodes.length; i < n; i++) {
    fragment.appendChild(this.childNodes[i].freeze(options));
  }

  return fragment;
};

/**
 */

module.exports = function() {
  var children = Array.prototype.slice.call(arguments);
  if (children.length === 1) return children[0];
  return new Fragment(children);
};
