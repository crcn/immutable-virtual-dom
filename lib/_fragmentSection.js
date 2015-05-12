var extend = require("xtend/mutable");
var Base   = require("./_baseSection");

function FragmentSection(document, node, start, end) {
  Base.call(this, document, node);

  this.start = start || document.createTextNode("");
  this.end   = end   || document.createTextNode("");
}

extend(FragmentSection.prototype, {
  render: function() {
    var fragment = this.document.createDocumentFragment();
    fragment.appendChild(this.start);
    fragment.appendChild(this.node);
    fragment.appendChild(this.end);
    return fragment;
  },
  remove: function() {
    var node  = this.document.createDocumentFragment();
    var start = this.start;
    var next  = start.nextSibling;
    var end   = this.end;
    while(next !== end) {
      node.appendChild(next);
      next = start.nextSibling;
    }

    // reset the node
    this.node = node;
  },
  createMarker: function() {

  },
  clone: function() {
    return new FragmentSection(this.document, this.node.cloneNode(), this.start.cloneNode(), this.end.cloneNode());
  }
});

module.exports = FragmentSection;
