Immutable virtual dom is a library that enables you to create templates that are *static*. The added benefit of this is that there are fewer moving parts, and you end up with a template engine that's a wee-bit more native than other *dynamic* virtual dom libraries. I.e: it's faster.

The only downside to this is that you don't have the added benefit of adding/removing elements around dynamically - creating complex UIs. Once you're template is compiled, you can only mutate the elements that you specified as dynamic.

Good news is that 99.9999% of web-apps don't need complex UIs, and the small edge cases where you might can easily be worked with.

Here's an example:

```javascript
var ivd      = require("immutable-virtual-dom");
var element  = ivd.element;
var text     = ivd.text;
var dynamic  = ivd.dynamic;
var fragment = ivd.fragment;
var template = ivd.template;

// create the virtual DOM
var tpl = template(fragment(text("Hello"), dynamic(text(), function(ref, options) {
  this.update = function(context) {
    ref.nodeValue = context;
  };
})));

var view = tpl.view();

// render the container first before updating
document.body.appendChild(view.render());

// update the container data after initialization. Important you do this
// after adding the container to the DOM.
view.update({ name: "jake" });
```

### Goals

- Decoupled from any platform. Should work on the server, browser, and native devices (possibly native ivd in the future). 
- Interoperable with other rendering methods. SVG, canvas, HTML should all be definable within the same template.
- Ability to change rendering engine on the fly.
- Should work with pre-existing template engines such as `mustache`, `handlebars`, and `jade`.
- Very few moving parts. Should leverage existing native APIs for speed such as `cloneNode()`.
- Not too inventive. Use existing specs & APIs. 

