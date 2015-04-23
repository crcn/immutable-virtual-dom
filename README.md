```javascript
var ivd      = require("immutable-virtual-dom");
var element  = ivd.element;
var text     = ivd.text;
var ref      = ivd.ref;
var fragment = ivd.fragment;


var vnode    = fragment(text("Hello"), ref(text(), function(ref, context) {
  ref.nodeValue = context.name;
}));

var template = vnode.template();
var view     = template.view();
view.update({ name: "jake" });
document.body.appendChild(view.getNode());
```
