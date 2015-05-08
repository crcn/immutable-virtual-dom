// dynamic(vnode, binding[, ...binding])

function Repeat(container, attributes) {
  this.container        = container;
  this.childrenTemplate = container.vnode.template();
  this._children        = [];
}

Repeat.prototype.update = function() {

};

var vnode = dynamic(element(Repeat, {
  name: "blarg"
}, text("hello"), dynamic(text(), function(textNode, content) {
  textNode.nodeValue = content.message;
})), function(repeatComponent, content) {
  repeatComponent.attributes.amount = content.amount;

  // update manually & batch changes here
  repeatComponent.update();
});

var template  = vnode.template();

/*var content  = template.content;
var bindings = template.bindings;

for (var i = bindings.length; i--;) {
  var binding = bindings[i].initialize(node);
  binding.update({ amount: 10, message: "world" });
}*/

var container = template.container();




var vnode = dynamic(element("li", {
  name:
}))
