Immutable virtual dom is a library that enables you to create templates that are *static*. The added benefit of this is that there are fewer moving parts, and you end up with a template engine that's a wee-bit more native than other *dynamic* virtual dom libraries. I.e: it's faster.

The only downside to this is that you don't have the added benefit of adding/removing elements around dynamically - creating complex UIs. Once you're template is compiled, you can only mutate the elements that you specified as dynamic.

Good news is that 99.9999% of web-apps don't need complex UIs, and the small edge cases where you might can easily be worked with. 

The goal of this library is to provide a super lean rendering engine for template engines such as `mustache`, `handlebars`, `jade`, giving them a nice boost that's comparable to React, and other similar libraries.


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
