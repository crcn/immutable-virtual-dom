var component = require("./component");

/**
 */

function Fragment(childNodes) {
  this.childNodes = childNodes;
}

/**
 */

Fragment.prototype.nodeType = 11;

/**
 */

Fragment.prototype.create = function(document, hydrators) {

  var fragment = document.createDocuemtFragment();

  for (var i = 0, n = this.childNodes.length; i < n; i++) {
    fragment.appendChild(this.childNodes[i].create(document, hydrators));
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
