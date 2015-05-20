/**
 */

function Comment(nodeValue) {
  this.nodeValue = nodeValue || "";
}

/**
 */

Comment.prototype.nodeType = 8;

/**
 */

Comment.prototype.freeze = function(options) {
  return options.document.freezeComment(this.nodeValue);
};

/**
 */

module.exports = function(nodeValue) {
  return new Comment(nodeValue);
};
