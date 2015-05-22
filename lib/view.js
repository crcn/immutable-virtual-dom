/**
 */

function View(section, bindings, context) {

  this.section  = section;
  this.bindings = bindings;

  if (context) this.update(context);
}

/**
 * updates the view
 */

View.prototype.update = function(context) {
  for (var i = 0, n = this.bindings.length; i < n; i++) {
    this.bindings[i].update(context);
  }
};

/**
 */

View.prototype.render = function() {
  return this.section.render();
};

/**
 */

View.prototype.remove = function() {
  return this.section.remove();
};

/**
 */

module.exports = View;
