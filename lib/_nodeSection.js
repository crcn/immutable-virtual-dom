var extend        = require("xtend/mutable");
var Base          = require("./_baseSection");
var getNodeByPath = require("./_getNodeByPath");
var getNodePath   = require("./_getNodePath");


function NodeSection(document, node) {
  Base.call(this, document, node);
}

extend(NodeSection.prototype, {
  createMarker: function() {
    return new Marker(this.document, getNodePath(this.node));
  },
  appendChild: function(childNode) {
    this.node.appendChild(childNode);
  },
  render: function() {
    return this.node;
  },
  remove: function() {
    this.node.parentNode.removeChild(this.node);
  }
});

function Marker(document, path) {
  this.document = document;
  this.path     = path;
}

extend(Marker.prototype, {
  createSection: function(root) {
    return new NodeSection(this.document, getNodeByPath(root, this.path));
  }
});

module.exports = NodeSection;
