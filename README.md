

```javascript
var ivd      = require("immutable-virtual-dom");
var element  = ivd.element;
var text     = ivd.text;
var ref      = ivd.ref;
var fragment = ivd.fragment;


var vnode    = fragment(text("Hello"), ref(text(), function(ref, context) {
  ref.nodeValue = context.name;
}));

var template  = vnode.freeze();
var container = template.container();
container.update({ name: "jake" });
document.body.appendChild(container.ref);


function RepeatComponent(container, attributes) {
  this children   = container.vnode.childNodes.freeze();
  this.container  = container;
  this.attributes = attributes;
  this.update();
}

RepeatComponent.prototype.update = function() {
  for (var i = 0; i < this.attributes.amount; i++) {
    var child = this.children.container();
    child.update({ count: i });
    this.container.appendChild(child.getNode());
  }
}

vnode = element(RepeatComponent, { amount: 10, key: "count" }, ref(text(), function(ref, context) {
  ref.nodeValue = context.count;
}));

document.body.appendChild(vnode.template().container().ref);
```
