module.exports = function(node) {

  var path = [];
  var p    = node.parentNode;
  var c    = node;

  while (p) {
    path.unshift(Array.prototype.indexOf.call(p.childNodes, c));
    c = p;
    p = p.parentNode;
  }

  return path;
}
