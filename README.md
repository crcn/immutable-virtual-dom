Immutable virtual dom is a library that enables you to create templates that are *static*. The added benefit of this is that there are fewer moving parts, and you end up with a template engine that's a wee-bit more native than other *dynamic* virtual dom libraries. I.e: it's faster.

The only downside to this is that you don't have the added benefit of adding/removing elements around dynamically - creating complex UIs. Once you're template is compiled, you can only mutate the elements that you specified as dynamic.

Good news is that 99.9999% of web-apps don't need complex UIs, and the small edge cases where you might can easily be worked with. 

The goal of this library is to provide a super lean rendering engine for template libraries such as `mustache`, `handlebars`, `jade`, giving them a nice boost that's comparable to React, and other similar things. The other goal is to provide an interface that's compatible with web components - i.e: it shouldn't be *too* inventive.


```javascript
var ivd      = require("immutable-virtual-dom");
var element  = ivd.element;
var text     = ivd.text;
var dynamic  = ivd.dynamic;
var fragment = ivd.fragment;

// create the virtual DOM
var vnode    = fragment(text("Hello"), dynamic(text(), function(textNode, context) {
  textNode.nodeValue = context.name;
}));

// create a new template with the document object
var template  = vnode.template(document); 

// create a new container - clones the template node, and sets up the bindings
var container = template.container();

// render the container first before updating
document.body.appendChild(container.render());

// update the container data after initialization. Important you do this
// after adding the container to the DOM. 
container.update({ name: "jake" });
```
