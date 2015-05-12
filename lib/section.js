var extend          = require("xtend/mutable");
var FragmentSection = require("./_fragmentSection");
var NodeSection     = require("./_nodeSection");

module.exports = function(document, node) {
  if (node.nodeType === 11) {
    return new FragmentSection(document, node);
  } else {
    return new NodeSection(document, node);
  }
};
