/**
 */

function Text(nodeValue) {
  this.nodeValue = nodeValue || "";
}

/**
 */

Text.prototype.create = function(document) {
  return document.createTextNode(this.nodeValue);
};

/**
 */

module.exports = function(nodeValue) {
  return new Text(nodeValue);
};
