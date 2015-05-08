/**
 */

function Hydrator(section, handler) {
  this.section = section;
  this.handler = handler;
}

/**
 */

Hydrator.prototype.initialize = function() {
  this.marker = this.section.createMarker();
};

/**
 */

Hydrator.prototype.hydrate = function(rootNode, bindings) {
  var section = this.marker.getSection(rootNode);
  // bindings.push(new Binding(section, this.handler));
};

/**
 */

module.exports = Hydrator;
